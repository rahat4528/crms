import { NextRequest } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/db"
import { HomeBlock } from "@/models/Blocks"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"
import { z } from "zod"

const UpdateBatchBlocksSchema = z.object({
  blocks: z
    .array(
      z.object({
        _id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid block ID"),
        isLive: z.boolean().optional(),
      })
    )
    .max(50, "Cannot update more than 50 blocks at once"),
})

export async function GET() {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    await dbConnect()
    const blocks = await HomeBlock.find()
      .populate("picking.itemIds", "title slug price gallery")
      .populate("picking.rules.collection", "title slug")
      .sort({ position: 1 })
      .lean()

    return okResponse({ items: blocks })
  } catch (error) {
    console.error("GET /api/studio/home-blocks error:", error)
    return failResponse("Failed to fetch studio home blocks", "STUDIO_BLOCKS_ERROR", 500)
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
    const parsed = UpdateBatchBlocksSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid blocks data", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()

    const { blocks } = parsed.data

    // Update positions/status in batch safely
    await Promise.all(
      blocks.map((b, idx) =>
        HomeBlock.findByIdAndUpdate(b._id, {
          $set: {
            position: idx,
            ...(b.isLive !== undefined ? { isLive: b.isLive } : {}),
          },
        })
      )
    )

    return okResponse({ message: "Blocks updated successfully" })
  } catch (error) {
    console.error("PUT /api/studio/home-blocks error:", error)
    return failResponse("Failed to update studio blocks", "STUDIO_BLOCKS_ERROR", 500)
  }
}
