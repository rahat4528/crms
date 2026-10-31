import { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import Look from "@/models/Look"
import { okResponse, failResponse } from "@/lib/api"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect()
    const { slug } = await params

    const look = await Look.findOne({ slug })
      .populate("hotspots.itemId", "title slug price gallery listPrice")
      .lean()

    if (!look) {
      return failResponse("Look not found", "LOOK_NOT_FOUND", 404)
    }

    return okResponse({ item: look })
  } catch (error) {
    console.error("GET /api/looks/[slug] error:", error)
    return failResponse("Failed to fetch look", "LOOK_FETCH_ERROR", 500)
  }
}

