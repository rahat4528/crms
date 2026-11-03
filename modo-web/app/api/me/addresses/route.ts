import { NextRequest } from "next/server"
import { z } from "zod"
import mongoose from "mongoose"
import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { okResponse, failResponse } from "@/lib/api"
import { rateLimit, getClientIp, RateLimits } from "@/lib/rate-limit"

const AddAddressSchema = z.object({
  label: z.string().trim().max(50).default("Home"),
  street: z.string().trim().min(3, "Street address must be at least 3 characters").max(200),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100),
  state: z.string().trim().max(100).optional().default(""),
  postalCode: z.string().trim().min(2, "Postal code is required").max(20),
  country: z.string().trim().min(2).max(10).default("US"),
  isDefault: z.boolean().optional().default(false),
})

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    await dbConnect()
    const user = await User.findById(session.user.id).select("addresses").lean()
    if (!user) {
      return failResponse("User not found", "USER_NOT_FOUND", 404)
    }

    return okResponse({ addresses: user.addresses || [] })
  } catch (error) {
    console.error("GET /api/me/addresses error:", error)
    return failResponse("Failed to fetch addresses", "SERVER_ERROR", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const ip = getClientIp(req)
    const rateLimitKey = `address:${session.user.id}:${ip}`
    const rateResult = rateLimit(rateLimitKey, RateLimits.ADDRESS.limit, RateLimits.ADDRESS.windowMs)
    if (!rateResult.success) {
      return failResponse(
        `Too many address modification requests. Please wait ${rateResult.retryAfterSeconds} seconds.`,
        "RATE_LIMITED",
        429
      )
    }

    const body = await req.json()
    const parsed = AddAddressSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid address data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const user = await User.findById(session.user.id)
    if (!user) {
      return failResponse("User not found", "USER_NOT_FOUND", 404)
    }

    user.addresses = user.addresses || []

    if (user.addresses.length >= 10) {
      return failResponse("Address limit reached (maximum 10 saved addresses)", "LIMIT_REACHED", 400)
    }

    // If marked as default or first address, clear other defaults
    if (parsed.data.isDefault || user.addresses.length === 0) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false
      })
      parsed.data.isDefault = true
    }

    user.addresses.push(parsed.data)
    await user.save()

    return okResponse({ addresses: user.addresses })
  } catch (error) {
    console.error("POST /api/me/addresses error:", error)
    return failResponse("Failed to save address", "SERVER_ERROR", 500)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const { searchParams } = new URL(req.url)
    const addressId = searchParams.get("addressId")

    if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
      return failResponse("Invalid address ID", "INVALID_ID", 400)
    }

    await dbConnect()
    const user = await User.findById(session.user.id)
    if (!user) {
      return failResponse("User not found", "USER_NOT_FOUND", 404)
    }

    user.addresses = (user.addresses || []).filter(
      (addr: any) => addr._id && addr._id.toString() !== addressId
    )
    await user.save()

    return okResponse({ addresses: user.addresses })
  } catch (error) {
    console.error("DELETE /api/me/addresses error:", error)
    return failResponse("Failed to remove address", "SERVER_ERROR", 500)
  }
}
