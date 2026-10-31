import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Look from "@/models/Look"
import { okResponse, failResponse } from "@/lib/api"
import { auth } from "@/auth"

export async function GET() {
  try {
    await dbConnect()

    const looks = await Look.find({ state: "published" })
      .populate("hotspots.itemId", "title slug price gallery listPrice")
      .sort({ publishedAt: -1 })
      .lean()

    return okResponse({ items: looks })
  } catch (error) {
    console.error("GET /api/looks error:", error)
    return failResponse("Failed to fetch looks", "LOOKS_FETCH_ERROR", 500)
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
    await dbConnect()

    const look = await Look.create(body)
    return okResponse({ item: look }, 201)
  } catch (error) {
    console.error("POST /api/looks error:", error)
    return failResponse("Failed to create look", "LOOK_CREATE_ERROR", 500)
  }
}

