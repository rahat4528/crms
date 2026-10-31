import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import JournalEntry from "@/models/JournalEntry"
import { okResponse, failResponse, parsePaginationParams, buildPageInfo } from "@/lib/api"
import { JournalEntrySchema } from "@/types/journal"
import { auth } from "@/auth"
import { slugify } from "@/lib/cn"

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const { page, pageSize, skip } = parsePaginationParams(searchParams, 9)

    const query: Record<string, unknown> = { state: "published" }

    const label = searchParams.get("label")
    if (label) {
      query.labels = label
    }

    const [entries, total] = await Promise.all([
      JournalEntry.find(query)
        .populate("linkedItems", "title slug price gallery")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean({ virtuals: true }),
      JournalEntry.countDocuments(query),
    ])

    const pageInfo = buildPageInfo(total, page, pageSize)
    return okResponse({ items: entries, pageInfo })
  } catch (error) {
    console.error("GET /api/journal error:", error)
    return failResponse("Failed to fetch journal entries", "JOURNAL_FETCH_ERROR", 500)
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
    const parsed = JournalEntrySchema.safeParse(body)
    if (!parsed.success) {
      return failResponse("Invalid input", "VALIDATION_ERROR", 400, parsed.error.flatten())
    }

    await dbConnect()
    const data = parsed.data
    const slug = data.slug || slugify(data.title)

    const entry = await JournalEntry.create({
      ...data,
      slug,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    })

    return okResponse({ item: entry }, 201)
  } catch (error) {
    console.error("POST /api/journal error:", error)
    return failResponse("Failed to create journal entry", "JOURNAL_CREATE_ERROR", 500)
  }
}

