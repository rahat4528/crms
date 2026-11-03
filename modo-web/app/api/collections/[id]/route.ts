import { NextRequest } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/db"
import Collection from "@/models/Collection"
import Item from "@/models/Item"
import { okResponse, failResponse } from "@/lib/api"
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

    const collection = await Collection.findOne(query)
      .populate("parent", "title slug")
      .populate("children", "title slug cover isVisible")
      .lean()

    if (!collection) {
      return failResponse("Collection not found", "COLLECTION_NOT_FOUND", 404)
    }

    return okResponse({ item: collection })
  } catch (error) {
    console.error("GET /api/collections/[id] error:", error)
    return failResponse("Failed to fetch collection", "COLLECTION_FETCH_ERROR", 500)
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
      return failResponse("Invalid collection ID", "INVALID_ID", 400)
    }

    const body = await req.json()

    await dbConnect()
    const collection = await Collection.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })

    if (!collection) {
      return failResponse("Collection not found", "COLLECTION_NOT_FOUND", 404)
    }

    return okResponse({ item: collection })
  } catch (error) {
    console.error("PUT /api/collections/[id] error:", error)
    return failResponse("Failed to update collection", "COLLECTION_UPDATE_ERROR", 500)
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
      return failResponse("Invalid collection ID", "INVALID_ID", 400)
    }

    await dbConnect()

    // Safety check: block delete if it has children
    const childCount = await Collection.countDocuments({ parent: id })
    if (childCount > 0) {
      return failResponse(
        "Cannot delete collection with sub-collections. Reassign or delete children first.",
        "COLLECTION_HAS_CHILDREN",
        400
      )
    }

    // Safety check: block delete if it still has items
    const itemCount = await Item.countDocuments({ collection: id })
    if (itemCount > 0) {
      return failResponse(
        `Cannot delete collection with ${itemCount} items attached. Reassign items first.`,
        "COLLECTION_HAS_ITEMS",
        400
      )
    }

    const collection = await Collection.findByIdAndDelete(id)
    if (!collection) {
      return failResponse("Collection not found", "COLLECTION_NOT_FOUND", 404)
    }

    return okResponse({ message: "Collection deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/collections/[id] error:", error)
    return failResponse("Failed to delete collection", "COLLECTION_DELETE_ERROR", 500)
  }
}
