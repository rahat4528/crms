import { NextRequest } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"
import { UpdateItemSchema } from "@/types/item"
import { auth } from "@/auth"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params

    const isObjectId = mongoose.Types.ObjectId.isValid(id)
    const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }

    const item = await Item.findOne(query)
      .populate("collection", "title slug")
      .populate("subCollection", "title slug")
      .lean({ virtuals: true })

    if (!item) {
      return failResponse("Item not found", "ITEM_NOT_FOUND", 404)
    }

    // Related items: pairs well with items in the same collection
    let pairsWellWith: unknown[] = []
    if (item.collection) {
      const collectionId = typeof item.collection === "object" && "_id" in item.collection
        ? item.collection._id
        : item.collection

      pairsWellWith = await Item.find({
        collection: collectionId,
        _id: { $ne: item._id },
        state: "live",
      })
        .limit(4)
        .lean({ virtuals: true })
    }

    return okResponse({ item, pairsWellWith })
  } catch (error) {
    console.error("GET /api/catalog/[id] error:", error)
    return failResponse("Failed to fetch item", "ITEM_FETCH_ERROR", 500)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const { id } = await params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return failResponse("Invalid item ID", "INVALID_ID", 400)
    }

    const body = await req.json()
    const parsed = UpdateItemSchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid input", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const item = await Item.findByIdAndUpdate(id, { $set: parsed.data }, { new: true, runValidators: true })

    if (!item) {
      return failResponse("Item not found", "ITEM_NOT_FOUND", 404)
    }

    return okResponse({ item })
  } catch (error) {
    console.error("PUT /api/catalog/[id] error:", error)
    return failResponse("Failed to update item", "ITEM_UPDATE_ERROR", 500)
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const { id } = await params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return failResponse("Invalid item ID", "INVALID_ID", 400)
    }

    await dbConnect()
    const item = await Item.findByIdAndDelete(id)

    if (!item) {
      return failResponse("Item not found", "ITEM_NOT_FOUND", 404)
    }

    return okResponse({ message: "Item deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/catalog/[id] error:", error)
    return failResponse("Failed to delete item", "ITEM_DELETE_ERROR", 500)
  }
}
