import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Order, { generateOrderNumber } from "@/models/Order"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"
import { rateLimit, getClientIp, RateLimits } from "@/lib/rate-limit"
import { CreateOrderSchema } from "@/types/order"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return failResponse("Please sign in to view your orders", "UNAUTHENTICATED", 401)
    }

    await dbConnect()
    const role = session.user.role || "client"
    const isStaff = ["staff", "manager", "owner", "admin"].includes(role)

    // Resource ownership enforcement: customers only see their own orders
    const query = isStaff
      ? {}
      : { $or: [{ client: session.user.id }, { email: session.user.email?.toLowerCase() }] }

    const orders = await Order.find(query)
      .sort({ addedAt: -1 })
      .lean({ virtuals: true })

    return okResponse({ items: orders })
  } catch (error) {
    console.error("GET /api/orders error:", error)
    return failResponse("Failed to fetch orders", "ORDERS_FETCH_ERROR", 500)
  }
}

export async function POST(req: NextRequest) {
  // Rate limiting against automated checkout floods
  const ip = getClientIp(req)
  const limitCheck = rateLimit(`orders:${ip}`, RateLimits.ORDERS.limit, RateLimits.ORDERS.windowMs)
  if (!limitCheck.success) {
    return failResponse(
      `Order submission limit reached. Please wait ${limitCheck.retryAfterSeconds} seconds before trying again.`,
      "RATE_LIMITED",
      429
    )
  }

  try {
    const session = await auth()
    const body = await req.json()
    const parsed = CreateOrderSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid order data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const { email, lines, shipTo, billTo, paymentProvider } = parsed.data

    // If customer is authenticated, enforce identity binding to prevent spoofing
    const verifiedEmail = session?.user?.email
      ? session.user.email.toLowerCase()
      : email?.toLowerCase()

    if (!verifiedEmail) {
      return failResponse("A valid contact email is required to process the order", "EMAIL_REQUIRED", 400)
    }

    const clientId = session?.user?.id || undefined

    // Fetch items from DB to compute real verified prices (never trust client)
    const itemIds = lines.map((l) => l.itemId)
    const dbItems = await Item.find({ _id: { $in: itemIds } }).lean()
    const itemMap = new Map(dbItems.map((i) => [i._id.toString(), i]))

    let subtotal = 0
    const orderLines = []

    for (const line of lines) {
      const dbItem = itemMap.get(line.itemId)
      if (!dbItem) {
        return failResponse(`Item ${line.itemId} is no longer available`, "ITEM_UNAVAILABLE", 400)
      }

      let price = dbItem.price
      let optionSnapshot = undefined

      if (line.optionSku) {
        const option = dbItem.options?.find((o) => o.sku === line.optionSku)
        if (option) {
          price = option.price
          optionSnapshot = {
            sku: option.sku,
            size: option.size,
            color: option.color,
            label: option.label,
          }
        }
      }

      const coverImage = dbItem.gallery?.find((g) => g.isCover)?.src || dbItem.gallery?.[0]?.src || ""

      orderLines.push({
        item: dbItem._id,
        option: optionSnapshot,
        qty: line.qty,
        unitPrice: price,
        titleSnapshot: dbItem.title,
        imageSnapshot: coverImage,
      })

      subtotal += price * line.qty
    }

    // Shipping policy: free shipping over $150, else $12
    const shipping = subtotal >= 150 ? 0 : 12
    const tax = Math.round(subtotal * 0.08 * 100) / 100 // 8% estimated tax
    const total = Math.round((subtotal + shipping + tax) * 100) / 100

    const orderNo = generateOrderNumber()

    const order = await Order.create({
      orderNo,
      client: clientId,
      email: verifiedEmail,
      lines: orderLines,
      totals: {
        subtotal,
        discount: 0,
        shipping,
        tax,
        total,
      },
      currency: "USD",
      state: "pending",
      payment: {
        provider: paymentProvider,
        status: "unpaid",
      },
      shipTo,
      billTo: billTo || shipTo,
      timeline: [
        {
          state: "Order placed",
          at: new Date(),
          by: session?.user?.name || "Client",
          note: "Order created successfully",
        },
      ],
    })

    return okResponse({ item: order }, 201)
  } catch (error) {
    console.error("POST /api/orders error:", error)
    return failResponse("Failed to place order", "ORDER_CREATE_ERROR", 500)
  }
}
