import { notFound } from "next/navigation"
import type { Metadata } from "next"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import ItemGallery from "@/components/item-gallery"
import ItemReviews from "@/components/item-reviews"
import ItemQuestions from "@/components/item-questions"
import PairsWellWith from "@/components/pairs-well-with"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import Review from "@/models/Review"
import { formatPrice } from "@/lib/cn"
import { AddToBagClient } from "./add-to-bag-client"
import type { ItemDto } from "@/types/item"
import { Sparkles, ShieldCheck, RefreshCw } from "lucide-react"

interface ItemPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  await dbConnect()
  const { slug } = await params
  const item = await Item.findOne({ slug, state: "live" }).lean()
  if (!item) return { title: "Piece Not Found" }

  return {
    title: item.title,
    description: item.summary || item.description?.slice(0, 160),
    openGraph: {
      title: `${item.title} — Virga`,
      description: item.summary || item.description?.slice(0, 160),
      images: item.gallery?.[0]?.src ? [{ url: item.gallery[0].src }] : [],
    },
  }
}

export default async function ItemDetailPage({ params }: ItemPageProps) {
  await dbConnect()
  const { slug } = await params

  const itemDoc = await Item.findOne({ slug, state: { $ne: "draft" } })
    .populate("collection", "title slug")
    .populate("subCollection", "title slug")
    .lean({ virtuals: true })

  if (!itemDoc) {
    notFound()
  }

  const [reviewDocs, relatedDocs] = await Promise.all([
    Review.find({ item: itemDoc._id, isApproved: true })
      .sort({ addedAt: -1 })
      .limit(10)
      .lean(),
    Item.find({
      collection: itemDoc.collection?._id || itemDoc.collection,
      _id: { $ne: itemDoc._id },
      state: "live",
    })
      .limit(4)
      .lean({ virtuals: true }),
  ])

  const item = JSON.parse(JSON.stringify(itemDoc)) as ItemDto
  const reviews = JSON.parse(JSON.stringify(reviewDocs))
  const relatedItems = JSON.parse(JSON.stringify(relatedDocs)) as ItemDto[]

  const collectionTitle =
    typeof item.collection === "object" && item.collection?.title
      ? item.collection.title
      : "Catalog"
  const collectionSlug =
    typeof item.collection === "object" && item.collection?.slug
      ? item.collection.slug
      : ""

  const hasDiscount = item.listPrice && item.listPrice > item.price

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-6 sm:py-8 space-y-12">
        <TrailNav
          items={[
            { label: "Shop", href: "/shop" },
            ...(collectionSlug ? [{ label: collectionTitle, href: `/collections/${collectionSlug}` }] : []),
            { label: item.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ItemGallery gallery={item.gallery} title={item.title} />
          </div>

          {/* Details & Purchasing */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="text-primary font-semibold uppercase tracking-wider">{collectionTitle}</span>
                {item.isFresh && (
                  <>
                    <span>·</span>
                    <span className="text-foreground font-medium uppercase tracking-wider">New Arrival</span>
                  </>
                )}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {item.title}
              </h1>

              {item.summary && (
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {item.summary}
                </p>
              )}

              <div className="flex items-center space-x-3 pt-2">
                <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
                  {formatPrice(item.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-muted-foreground line-through font-normal">
                      {formatPrice(item.listPrice!)}
                    </span>
                    <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                      Save {Math.round(((item.listPrice! - item.price) / item.listPrice!) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Add to Bag component */}
            <AddToBagClient item={item} />

            {/* Atelier Guarantees Strip */}
            <div className="p-4 rounded-xl bg-card border border-border/80 space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Atelier Standard & Lifetime Repair Consults</span>
              </div>
              <p className="pl-6 text-[11px] leading-relaxed text-muted-foreground">
                Each piece includes replacement horn buttons and direct access to tailoring advice from our New York atelier.
              </p>
              <div className="flex items-center gap-2 text-foreground font-medium pt-1 border-t border-border/50">
                <RefreshCw className="h-4 w-4 text-secondary shrink-0" />
                <span>Complimentary Carbon-Neutral Returns within 30 Days</span>
              </div>
            </div>

            {/* Narrative description */}
            <div className="pt-6 border-t border-border/60 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Tailoring & Material Narrative
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line font-light">
                {item.description}
              </p>
            </div>

            {/* Questions & Materials Accordion */}
            <ItemQuestions details={item.details} />
          </div>
        </div>

        {/* Reviews Section */}
        <ItemReviews
          itemId={item._id}
          ratingStats={item.ratingStats || { avg: 5, total: 1 }}
          initialReviews={reviews}
        />

        {/* Related Strip */}
        <PairsWellWith items={relatedItems} />
      </main>
      <SiteFooter />
    </div>
  )
}
