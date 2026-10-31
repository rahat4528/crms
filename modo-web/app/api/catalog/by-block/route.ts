import { NextRequest } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/db"
import { HomeBlock } from "@/models/Blocks"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const blockIdOrSlug = searchParams.get("block") || searchParams.get("slug") || searchParams.get("id")

    if (!blockIdOrSlug) {
      return failResponse("Block identifier is required", "MISSING_BLOCK_PARAM", 400)
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(blockIdOrSlug)
    const block = await HomeBlock.findOne(
      isObjectId ? { $or: [{ _id: blockIdOrSlug }, { slug: blockIdOrSlug }] } : { slug: blockIdOrSlug }
    ).lean()

    if (!block) {
      return failResponse("Block not found", "BLOCK_NOT_FOUND", 404)
    }

    let items: unknown[] = []

    if (block.picking.mode === "manual" && block.picking.itemIds?.length) {
      const fetchedItems = await Item.find({
        _id: { $in: block.picking.itemIds },
        state: "live",
      })
        .populate("collection", "title slug")
        .lean({ virtuals: true })

      // Preserve manual order
      const itemMap = new Map(fetchedItems.map((item) => [item._id.toString(), item]))
      items = block.picking.itemIds
        .map((id) => itemMap.get(id.toString()))
        .filter(Boolean)
    } else {
      // Auto mode
      const query: Record<string, unknown> = { state: "live" }
      const rules = block.picking.rules

      if (rules?.collection) {
        query.collection = rules.collection
      }

      if (rules?.labels && rules.labels.length > 0) {
        query.labels = { $in: rules.labels }
      }

      let sortObj: Record<string, 1 | -1> = { addedAt: -1 }
      switch (rules?.sort) {
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
        default:
          sortObj = { addedAt: -1 }
      }

      const limit = rules?.limit || 8

      items = await Item.find(query)
        .populate("collection", "title slug")
        .sort(sortObj)
        .limit(limit)
        .lean({ virtuals: true })
    }

    return okResponse({ block, items })
  } catch (error) {
    console.error("GET /api/catalog/by-block error:", error)
    return failResponse("Failed to fetch block items", "BLOCK_ITEMS_ERROR", 500)
  }
}

