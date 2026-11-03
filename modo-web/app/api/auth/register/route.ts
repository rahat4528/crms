import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { rateLimit, getClientIp, addRateLimitHeaders, RateLimits } from "@/lib/rate-limit"
import { RegisterInputSchema } from "@/types/auth"

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rateLimitResult = rateLimit(`register:${ip}`, RateLimits.REGISTER.limit, RateLimits.REGISTER.windowMs)

  if (!rateLimitResult.success) {
    const errorResponse = NextResponse.json(
      {
        success: false,
        message: `Too many registration attempts. Please try again in ${rateLimitResult.retryAfterSeconds} seconds.`,
      },
      { status: 429 }
    )
    return addRateLimitHeaders(errorResponse, rateLimitResult)
  }

  try {
    const body = await req.json()
    const parsed = RegisterInputSchema.safeParse(body)

    if (!parsed.success) {
      const badResponse = NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
      return addRateLimitHeaders(badResponse, rateLimitResult)
    }

    const { name, email, password } = parsed.data

    await dbConnect()

    // Check if user already exists (enumeration safe message)
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      // Return 409 with neutral message preventing account enumeration
      const conflictResponse = NextResponse.json(
        { success: false, message: "An account with this email address already exists or cannot be registered." },
        { status: 409 }
      )
      return addRateLimitHeaders(conflictResponse, rateLimitResult)
    }

    // Always enforce "client" role regardless of any client-supplied role payloads
    const user = await User.create({
      name,
      email,
      password,
      role: "client",
    })

    const successResponse = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
    return addRateLimitHeaders(successResponse, rateLimitResult)
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred during registration. Please try again." },
      { status: 500 }
    )
  }
}
