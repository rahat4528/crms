import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import FilterPanel from "@/components/filter-panel"
import ItemGrid from "@/components/item-grid"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import Collection from "@/models/Collection"
import type { ItemDto } from "@/types/item"

interface ShopPageProps {
  searchParams: Promise<{
    q?: string
    sort?: string
    collection?: string
    fresh?: string
    offer?: string
    page?: string
  }>
}

export const dynamic = "force-dynamic"

export default async function ShopPage({ searchParams }: ShopPageProps) {
  let items: ItemDto[] = []
  let collections: any[] = []

  try {
    await dbConnect()
    const params = await searchParams

    const query: Record<string, unknown> = { state: "live" }

    if (params.q && params.q.trim()) {
      const regex = new RegExp(params.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      query.$or = [{ title: regex }, { description: regex }, { labels: regex }]
    }

    if (params.collection && params.collection !== "all") {
      query.collection = params.collection
    }

    if (params.fresh === "true") query.isFresh = true
    if (params.offer === "true") query.isOffer = true

    let sortObj: Record<string, 1 | -1> = { addedAt: -1 }
    switch (params.sort) {
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
      case "spotlight":
        sortObj = { spotlight: -1, addedAt: -1 }
        break
      default:
        sortObj = { addedAt: -1 }
    }

    const [itemsDocs, collectionsDocs] = await Promise.all([
      Item.find(query)
        .populate("collection", "title slug")
        .sort(sortObj)
        .limit(48)
        .lean({ virtuals: true }),
      Collection.find({ isVisible: true, parent: null }).select("title slug").lean(),
    ])

    items = JSON.parse(JSON.stringify(itemsDocs)) as ItemDto[]
    collections = JSON.parse(JSON.stringify(collectionsDocs))
  } catch (error) {
    console.warn("MongoDB offline during ShopPage prerender:", error)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-8 space-y-6">
        <TrailNav items={[{ label: "Catalog", href: "/shop" }]} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Considered Catalog
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {items.length} intentional pieces designed for longevity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterPanel collections={collections} />
          </div>

          {/* Catalog Grid */}
          <div className="lg:col-span-3">
            <ItemGrid items={items} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

