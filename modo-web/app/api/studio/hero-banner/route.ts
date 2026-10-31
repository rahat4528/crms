import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import { HeroBanner } from "@/models/Blocks"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"

export async function GET() {
  try {
    await dbConnect()
    const banner = await HeroBanner.findOne({ isLive: true }).lean()
    return okResponse({ item: banner })
  } catch (error) {
    console.error("GET /api/studio/hero-banner error:", error)
    return failResponse("Failed to fetch hero banner", "HERO_BANNER_ERROR", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const body = await req.json()
    await dbConnect()

    if (body.isLive !== false) {
      body.isLive = true
      await HeroBanner.updateMany({}, { $set: { isLive: false } })
    }

    const banner = await HeroBanner.create(body)
    return okResponse({ item: banner }, 201)
  } catch (error) {
    console.error("POST /api/studio/hero-banner error:", error)
    return failResponse("Failed to create hero banner", "HERO_BANNER_ERROR", 500)
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const body = await req.json()
    await dbConnect()

    const banner = await HeroBanner.findOneAndUpdate(
      { isLive: true },
      { $set: body },
      { new: true, upsert: true }
    )

    return okResponse({ item: banner })
  } catch (error) {
    console.error("PUT /api/studio/hero-banner error:", error)
    return failResponse("Failed to update hero banner", "HERO_BANNER_ERROR", 500)
  }
}

