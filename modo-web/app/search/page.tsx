import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import ItemGrid from "@/components/item-grid"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import type { ItemDto } from "@/types/item"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export const dynamic = "force-dynamic"

export default async function SearchPage({ searchParams }: SearchPageProps) {
  let items: ItemDto[] = []
  let queryTerm = ""

  try {
    const { q } = await searchParams
    queryTerm = q || ""
    await dbConnect()

    if (queryTerm && queryTerm.trim()) {
      const regex = new RegExp(queryTerm.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      const itemDocs = await Item.find({
        state: "live",
        $or: [{ title: regex }, { description: regex }, { labels: regex }],
      })
        .populate("collection", "title slug")
        .limit(30)
        .lean({ virtuals: true })

      items = JSON.parse(JSON.stringify(itemDocs)) as ItemDto[]
    }
  } catch (error) {
    console.warn("MongoDB offline during SearchPage prerender:", error)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-10 space-y-6">
        <TrailNav items={[{ label: "Search" }]} />

        <div className="pb-4 border-b border-border/60">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Search Results
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground mt-1">
            {queryTerm ? `Results for &ldquo;${queryTerm}&rdquo;` : "Search Catalog"}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {items.length} pieces found
          </p>
        </div>

        <ItemGrid items={items} />
      </main>
      <SiteFooter />
    </div>
  )
}

