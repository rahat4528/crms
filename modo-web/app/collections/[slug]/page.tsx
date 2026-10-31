import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import ItemGrid from "@/components/item-grid"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Collection from "@/models/Collection"
import Item from "@/models/Item"
import type { ItemDto } from "@/types/item"

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  await dbConnect()
  const { slug } = await params

  const collection = await Collection.findOne({ slug, isVisible: true })
    .populate("children", "title slug cover")
    .lean()

  if (!collection) {
    notFound()
  }

  // Fetch items in this collection or its sub-collections
  const collectionIds = [collection._id, ...(collection.children?.map((c) => c._id) || [])]
  const itemsDocs = await Item.find({
    collection: { $in: collectionIds },
    state: "live",
  })
    .sort({ addedAt: -1 })
    .limit(40)
    .lean({ virtuals: true })

  const items = JSON.parse(JSON.stringify(itemsDocs)) as ItemDto[]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1">
        {/* Collection Hero Header */}
        <div className="relative bg-muted/40 py-16 sm:py-24 border-b border-border/60">
          {collection.cover && (
            <div className="absolute inset-0 z-0 opacity-20">
              <Image src={collection.cover} alt={collection.title} fill sizes="100vw" className="object-cover" />
            </div>
          )}
          <div className="container-virga relative z-10 space-y-4">
            <TrailNav
              items={[
                { label: "Collections", href: "/shop" },
                { label: collection.title },
              ]}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Curated Collection
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                {collection.description}
              </p>
            )}

            {/* Sub-collection chips */}
            {collection.children && collection.children.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {(collection.children as any[]).map((child: { _id: string; title: string; slug: string }) => (
                  <Link
                    key={child._id}
                    href={`/collections/${child.slug}`}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-card border border-border/80 hover:border-foreground text-foreground transition-colors"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Items Grid */}
        <div className="container-virga py-12 space-y-6">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Showing {items.length} pieces in {collection.title}</span>
            <Link href="/shop" className="hover:text-foreground">
              View all collections →
            </Link>
          </div>
          <ItemGrid items={items} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
