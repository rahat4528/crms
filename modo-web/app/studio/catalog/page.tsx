import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import CatalogTable from "@/components/studio/catalog-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { ItemDto } from "@/types/item"

export const dynamic = "force-dynamic"

export default async function StudioCatalogPage() {
  await dbConnect()

  const itemsDocs = await Item.find()
    .populate("collection", "title slug")
    .sort({ addedAt: -1 })
    .lean({ virtuals: true })

  const items = JSON.parse(JSON.stringify(itemsDocs)) as ItemDto[]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Piece Catalog
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage live, draft, paused, and sold-out pieces across all collections.
          </p>
        </div>

        <Button asChild size="sm" className="rounded-full shadow-sm text-xs">
          <Link href="/studio/quick-add">
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            Add New Piece
          </Link>
        </Button>
      </div>

      <CatalogTable initialItems={items} />
    </div>
  )
}

