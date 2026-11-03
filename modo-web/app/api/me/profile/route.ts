import { NextRequest } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { okResponse, failResponse } from "@/lib/api"
import { rateLimit, getClientIp, RateLimits } from "@/lib/rate-limit"

const UpdateProfileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
})

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const ip = getClientIp(req)
    const rateLimitKey = `profile:${session.user.id}:${ip}`
    const rateResult = rateLimit(rateLimitKey, RateLimits.PROFILE.limit, RateLimits.PROFILE.windowMs)
    if (!rateResult.success) {
      return failResponse(
        `Too many profile update requests. Please wait ${rateResult.retryAfterSeconds} seconds.`,
        "RATE_LIMITED",
        429
      )
    }

    const body = await req.json()
    const parsed = UpdateProfileSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid profile data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { name: parsed.data.name } },
      { new: true, runValidators: true }
    ).select("name email role")

    if (!user) {
      return failResponse("User not found", "USER_NOT_FOUND", 404)
    }

    return okResponse({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("PATCH /api/me/profile error:", error)
    return failResponse("Failed to update profile", "SERVER_ERROR", 500)
  }
}
