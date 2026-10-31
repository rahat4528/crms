import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import JournalEntry from "@/models/JournalEntry"
import { formatPrice } from "@/lib/cn"

interface JournalSlugProps {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export default async function JournalArticlePage({ params }: JournalSlugProps) {
  await dbConnect()
  const { slug } = await params

  const entry = await JournalEntry.findOne({ slug, state: "published" })
    .populate("linkedItems", "title slug price gallery listPrice")
    .lean()

  if (!entry) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-12 space-y-10 max-w-4xl">
        <TrailNav
          items={[
            { label: "Journal", href: "/journal" },
            { label: entry.title },
          ]}
        />

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span className="font-semibold text-primary uppercase tracking-wider">
              {entry.labels?.[0] || "Dispatch"}
            </span>
            <span>·</span>
            <span>{new Date(entry.publishedAt || Date.now()).toLocaleDateString()}</span>
            <span>·</span>
            <span>{entry.readingMinutes || 3} min read</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            {entry.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {entry.excerpt}
          </p>
        </div>

        {entry.coverImage && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-sm">
            <Image
              src={entry.coverImage}
              alt={entry.title}
              fill
              priority
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-foreground/90 leading-relaxed text-base sm:text-lg whitespace-pre-line">
          {entry.body}
        </div>

        {/* Linked Items Strip */}
        {entry.linkedItems && entry.linkedItems.length > 0 && (
          <div className="pt-12 border-t border-border/80 space-y-6">
            <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
              Featured Pieces in this Story
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {entry.linkedItems.map((item: any) => {
                const cover = item.gallery?.[0]?.src || "/placeholder.jpg"
                return (
                  <Link
                    key={item._id.toString()}
                    href={`/shop/${item.slug}`}
                    className="group block space-y-2 p-3 rounded-2xl border border-border/80 bg-card hover:border-primary transition-colors"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                      <Image src={cover} alt={item.title} fill sizes="160px" className="object-cover" />
                    </div>
                    <p className="text-xs font-medium text-foreground truncate group-hover:text-primary">
                      {item.title}
                    </p>
                    <p className="text-xs font-semibold text-foreground">
                      {formatPrice(item.price)}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

