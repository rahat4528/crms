import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import { okResponse, failResponse, parsePaginationParams, buildPageInfo } from "@/lib/api"
import { CreateItemSchema } from "@/types/item"
import { auth } from "@/auth"
import { slugify } from "@/lib/cn"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    await dbConnect()
    const { searchParams } = new URL(req.url)
    const { page, pageSize, skip } = parsePaginationParams(searchParams, 20)

    const query: Record<string, unknown> = {}

    const state = searchParams.get("state")
    if (state && state !== "all") {
      query.state = state
    }

    const q = searchParams.get("q")
    if (q && q.trim()) {
      const regex = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      query.$or = [{ title: regex }, { slug: regex }, { labels: regex }]
    }

    const collection = searchParams.get("collection")
    if (collection && collection !== "all") {
      query.collection = collection
    }

    const [items, total] = await Promise.all([
      Item.find(query)
        .populate("collection", "title slug")
        .sort({ addedAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean({ virtuals: true }),
      Item.countDocuments(query),
    ])

    const pageInfo = buildPageInfo(total, page, pageSize)
    return okResponse({ items, pageInfo })
  } catch (error) {
    console.error("GET /api/studio/catalog error:", error)
    return failResponse("Failed to fetch studio catalog", "STUDIO_CATALOG_ERROR", 500)
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
    const parsed = CreateItemSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid input", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const data = parsed.data
    let slug = data.slug || slugify(data.title)

    const existing = await Item.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`
    }

    const item = await Item.create({ ...data, slug })
    return okResponse({ item }, 201)
  } catch (error) {
    console.error("POST /api/studio/catalog error:", error)
    return failResponse("Failed to create item in studio", "STUDIO_CREATE_ITEM_ERROR", 500)
  }
}

