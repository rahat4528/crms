import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import { HeroBanner } from "@/models/Blocks"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"
import { z } from "zod"

const HeroBannerInputSchema = z.object({
  headline: z.string().trim().min(2, "Headline must be at least 2 characters").max(200),
  subline: z.string().trim().max(500).optional(),
  primaryCta: z
    .object({
      label: z.string().trim().min(1).max(50),
      href: z.string().trim().min(1).max(200),
    })
    .optional(),
  secondaryCta: z
    .object({
      label: z.string().trim().min(1).max(50),
      href: z.string().trim().min(1).max(200),
    })
    .optional(),
  backdrop: z.string().trim().max(500).default(""),
  isLive: z.boolean().default(true),
})

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
    const parsed = HeroBannerInputSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid hero banner data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()

    if (parsed.data.isLive) {
      await HeroBanner.updateMany({}, { $set: { isLive: false } })
    }

    const banner = await HeroBanner.create(parsed.data)
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
    const parsed = HeroBannerInputSchema.partial().safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid hero banner data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()

    if (parsed.data.isLive) {
      await HeroBanner.updateMany({}, { $set: { isLive: false } })
    }

    const banner = await HeroBanner.findOneAndUpdate(
      { isLive: true },
      { $set: parsed.data },
      { new: true, upsert: true }
    )

    return okResponse({ item: banner })
  } catch (error) {
    console.error("PUT /api/studio/hero-banner error:", error)
    return failResponse("Failed to update hero banner", "HERO_BANNER_ERROR", 500)
  }
}
