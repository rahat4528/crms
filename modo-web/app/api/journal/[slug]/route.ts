import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import JournalEntry from "@/models/JournalEntry"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect()
    const { slug } = await params

    const entry = await JournalEntry.findOne({ slug })
      .populate("linkedItems", "title slug price gallery listPrice")
      .lean({ virtuals: true })

    if (!entry) {
      return failResponse("Journal entry not found", "JOURNAL_NOT_FOUND", 404)
    }

    return okResponse({ item: entry })
  } catch (error) {
    console.error("GET /api/journal/[slug] error:", error)
    return failResponse("Failed to fetch journal entry", "JOURNAL_FETCH_ERROR", 500)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["staff", "manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const { slug } = await params
    const body = await req.json()

    await dbConnect()
    const entry = await JournalEntry.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!entry) {
      return failResponse("Journal entry not found", "JOURNAL_NOT_FOUND", 404)
    }

    return okResponse({ item: entry })
  } catch (error) {
    console.error("PUT /api/journal/[slug] error:", error)
    return failResponse("Failed to update journal entry", "JOURNAL_UPDATE_ERROR", 500)
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    const role = session?.user?.role || "client"
    if (!["manager", "owner", "admin"].includes(role)) {
      return failResponse("Unauthorized", "UNAUTHORIZED", 401)
    }

    const { slug } = await params
    await dbConnect()

    const entry = await JournalEntry.findOneAndDelete({ slug })
    if (!entry) {
      return failResponse("Journal entry not found", "JOURNAL_NOT_FOUND", 404)
    }

    return okResponse({ message: "Journal entry deleted" })
  } catch (error) {
    console.error("DELETE /api/journal/[slug] error:", error)
    return failResponse("Failed to delete journal entry", "JOURNAL_DELETE_ERROR", 500)
  }
}

