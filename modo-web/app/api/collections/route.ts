import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Collection from "@/models/Collection"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"
import { slugify } from "@/lib/cn"
import { z } from "zod"

const CollectionInputSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  cover: z.string().optional(),
  parent: z.string().nullable().optional(),
  isVisible: z.boolean().default(true),
  position: z.number().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const includeChildren = searchParams.get("includeChildren") === "true"
    const onlyParents = searchParams.get("onlyParents") === "true"

    const query: Record<string, unknown> = { isVisible: true }
    if (onlyParents) {
      query.parent = null
    }

    let collections
    if (includeChildren) {
      collections = await Collection.find(query)
        .populate("children", "title slug cover isVisible")
        .sort({ position: 1, title: 1 })
        .lean()
    } else {
      collections = await Collection.find(query)
        .sort({ position: 1, title: 1 })
        .lean()
    }

    return okResponse({ items: collections })
  } catch (error) {
    console.error("GET /api/collections error:", error)
    return failResponse("Failed to fetch collections", "COLLECTIONS_FETCH_ERROR", 500)
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
    const parsed = CollectionInputSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid input", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const data = parsed.data
    const slug = data.slug || slugify(data.title)

    const collection = await Collection.create({
      ...data,
      slug,
      children: [],
    })

    return okResponse({ item: collection }, 201)
  } catch (error) {
    console.error("POST /api/collections error:", error)
    return failResponse("Failed to create collection", "COLLECTION_CREATE_ERROR", 500)
  }
}

