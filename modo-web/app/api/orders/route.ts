import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Order, { generateOrderNumber } from "@/models/Order"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"
import { z } from "zod"

const CreateOrderSchema = z.object({
  email: z.string().email(),
  lines: z
    .array(
      z.object({
        itemId: z.string(),
        optionSku: z.string().optional(),
        qty: z.number().int().min(1),
      })
    )
    .min(1, "Order must contain at least one item"),
  shipTo: z.object({
    fullName: z.string().min(2),
    street: z.string().min(3),
    apartment: z.string().optional(),
    city: z.string().min(2),
    state: z.string().optional(),
    postalCode: z.string().min(2),
    country: z.string().default("US"),
    phone: z.string().optional(),
  }),
  billTo: z
    .object({
      fullName: z.string(),
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string().default("US"),
    })
    .optional(),
  paymentProvider: z.string().default("stripe"),
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return failResponse("Please sign in to view your orders", "UNAUTHENTICATED", 401)
    }

    await dbConnect()
    const role = session.user.role || "client"
    const isStaff = ["staff", "manager", "owner", "admin"].includes(role)

    const query = isStaff ? {} : { $or: [{ client: session.user.id }, { email: session.user.email }] }

    const orders = await Order.find(query)
      .sort({ addedAt: -1 })
      .limit(50)
      .lean()

    return okResponse({ items: orders })
  } catch (error) {
    console.error("GET /api/orders error:", error)
    return failResponse("Failed to fetch orders", "ORDERS_FETCH_ERROR", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const body = await req.json()
    const parsed = CreateOrderSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid order data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const { email, lines, shipTo, billTo, paymentProvider } = parsed.data

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
      client: session?.user?.id || undefined,
      email: email.toLowerCase(),
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

