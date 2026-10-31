import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import Collection from "@/models/Collection"
import { okResponse, failResponse } from "@/lib/api"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") || "").trim()
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)))

    if (!q || q.length < 2) {
      return okResponse({ items: [], suggestions: [], facets: { collections: [], labels: [] } })
    }

    // Search query using regex fallback for robust fuzzy matching in dev/Atlas
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")

    const [items, collections, labelAgg] = await Promise.all([
      Item.find({
        state: "live",
        $or: [{ title: regex }, { description: regex }, { labels: regex }],
      })
        .populate("collection", "title slug")
        .limit(limit)
        .lean({ virtuals: true }),

      Collection.find({
        isVisible: true,
        title: regex,
      })
        .limit(5)
        .select("title slug")
        .lean(),

      Item.aggregate([
        { $match: { state: "live" } },
        { $unwind: "$labels" },
        { $match: { labels: regex } },
        { $group: { _id: "$labels", count: { $sum: 1 } } },
        { $limit: 8 },
      ]),
    ])

    const suggestions = [
      ...collections.map((c) => ({ type: "collection", title: c.title, href: `/collections/${c.slug}` })),
      ...items.slice(0, 5).map((i) => ({ type: "item", title: i.title, href: `/shop/${i.slug}` })),
    ]

    return okResponse({
      items,
      suggestions,
      facets: {
        collections,
        labels: labelAgg.map((l) => ({ label: l._id, count: l.count })),
      },
    })
  } catch (error) {
    console.error("GET /api/catalog/search error:", error)
    return failResponse("Search failed", "SEARCH_ERROR", 500)
  }
}

