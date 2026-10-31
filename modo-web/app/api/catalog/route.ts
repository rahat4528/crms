import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import { okResponse, failResponse, parsePaginationParams, buildPageInfo } from "@/lib/api"
import { CreateItemSchema } from "@/types/item"
import { auth } from "@/auth"
import { slugify } from "@/lib/cn"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const { page, pageSize, skip } = parsePaginationParams(searchParams, 12)

    const query: Record<string, unknown> = { state: "live" }

    // Text search
    const q = searchParams.get("q")
    if (q && q.trim()) {
      query.$text = { $search: q.trim() }
    }

    // Collection filter
    const collection = searchParams.get("collection")
    if (collection) {
      query.collection = collection
    }

    const subCollection = searchParams.get("subCollection")
    if (subCollection) {
      query.subCollection = subCollection
    }

    // Flags
    if (searchParams.get("spotlight") === "true") query.spotlight = true
    if (searchParams.get("fresh") === "true") query.isFresh = true
    if (searchParams.get("offer") === "true") query.isOffer = true

    // Price range
    const priceMin = parseFloat(searchParams.get("priceMin") || "")
    const priceMax = parseFloat(searchParams.get("priceMax") || "")
    if (!isNaN(priceMin) || !isNaN(priceMax)) {
      query.price = {}
      if (!isNaN(priceMin)) (query.price as Record<string, number>).$gte = priceMin
      if (!isNaN(priceMax)) (query.price as Record<string, number>).$lte = priceMax
    }

    // Labels
    const labels = searchParams.get("labels")
    if (labels) {
      query.labels = { $in: labels.split(",").map((l) => l.trim()) }
    }

    // Sort
    let sortObj: Record<string, 1 | -1> = { addedAt: -1 }
    const sort = searchParams.get("sort") || "newest"
    switch (sort) {
      case "price-asc":
        sortObj = { price: 1 }
        break
      case "price-desc":
        sortObj = { price: -1 }
        break
      case "top-rated":
        sortObj = { "ratingStats.avg": -1 }
        break
      case "best-selling":
        sortObj = { "salesStats.units": -1 }
        break
      case "spotlight":
        sortObj = { spotlight: -1, addedAt: -1 }
        break
      default:
        sortObj = { addedAt: -1 }
    }

    const [items, total] = await Promise.all([
      Item.find(query)
        .populate("collection", "title slug")
        .sort(sortObj)
        .skip(skip)
        .limit(pageSize)
        .lean({ virtuals: true }),
      Item.countDocuments(query),
    ])

    const pageInfo = buildPageInfo(total, page, pageSize)

    return okResponse({
      items,
      pageInfo,
      appliedFilters: {
        sort,
        collection,
        q,
        priceMin: isNaN(priceMin) ? undefined : priceMin,
        priceMax: isNaN(priceMax) ? undefined : priceMax,
        spotlight: searchParams.get("spotlight") === "true" || undefined,
        fresh: searchParams.get("fresh") === "true" || undefined,
        offer: searchParams.get("offer") === "true" || undefined,
      },
    })
  } catch (error) {
    console.error("GET /api/catalog error:", error)
    return failResponse("Failed to fetch catalog items", "CATALOG_FETCH_ERROR", 500)
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

    const itemData = parsed.data
    let slug = itemData.slug || slugify(itemData.title)

    // Ensure slug uniqueness
    const existing = await Item.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`
    }

    const item = await Item.create({
      ...itemData,
      slug,
    })

    return okResponse({ item }, 201)
  } catch (error) {
    console.error("POST /api/catalog error:", error)
    return failResponse("Failed to create item", "CREATE_ITEM_ERROR", 500)
  }
}

