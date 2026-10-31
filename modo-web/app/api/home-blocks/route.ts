import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import { HomeBlock } from "@/models/Blocks"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"
import { HomeBlockFormSchema } from "@/types/home-blocks"
import { auth } from "@/auth"

export async function GET() {
  try {
    await dbConnect()

    const blocks = await HomeBlock.find({ isLive: true })
      .sort({ position: 1 })
      .lean()

    // Populate items for each block based on manual or auto picking
    const enrichedBlocks = await Promise.all(
      blocks.map(async (block) => {
        let items: unknown[] = []

        if (block.picking.mode === "manual" && block.picking.itemIds?.length) {
          const fetchedItems = await Item.find({
            _id: { $in: block.picking.itemIds },
            state: "live",
          })
            .populate("collection", "title slug")
            .lean({ virtuals: true })

          const itemMap = new Map(fetchedItems.map((item) => [item._id.toString(), item]))
          items = block.picking.itemIds
            .map((id) => itemMap.get(id.toString()))
            .filter(Boolean)
        } else {
          const rules = block.picking.rules
          const query: Record<string, unknown> = { state: "live" }

          if (rules?.collection) query.collection = rules.collection
          if (rules?.labels && rules.labels.length) query.labels = { $in: rules.labels }

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

          items = await Item.find(query)
            .populate("collection", "title slug")
            .sort(sortObj)
            .limit(rules?.limit || 8)
            .lean({ virtuals: true })
        }

        return { ...block, items }
      })
    )

    return okResponse({ items: enrichedBlocks })
  } catch (error) {
    console.error("GET /api/home-blocks error:", error)
    return failResponse("Failed to fetch home blocks", "HOME_BLOCKS_FETCH_ERROR", 500)
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
    const parsed = HomeBlockFormSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid input", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const block = await HomeBlock.create(parsed.data)
    return okResponse({ item: block }, 201)
  } catch (error) {
    console.error("POST /api/home-blocks error:", error)
    return failResponse("Failed to create home block", "HOME_BLOCK_CREATE_ERROR", 500)
  }
}

