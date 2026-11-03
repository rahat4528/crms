import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import JournalEntry from "@/models/JournalEntry"

export const revalidate = 60

export default async function JournalPage() {
  let entries: any[] = []
  try {
    await dbConnect()
    entries = await JournalEntry.find({ state: "published" })
      .sort({ publishedAt: -1 })
      .lean()
  } catch (error) {
    console.warn("MongoDB offline during JournalPage prerender:", error)
  }

  const leadArticle = entries[0]
  const otherArticles = entries.slice(1)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-10 sm:py-14 space-y-12">
        <TrailNav items={[{ label: "Journal" }]} />

        {/* Page Header */}
        <div className="space-y-3 max-w-2xl pb-4 border-b border-border/70">
          <span className="editorial-caps text-primary">Essays & Atelier Field Notes</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            The Virga Journal
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-light">
            Reflections on slow craft, material provenance, circular textile design, and intentional living.
          </p>
        </div>

        {/* Lead Featured Article */}
        {leadArticle && (
          <Link
            href={`/journal/${leadArticle.slug}`}
            className="group block rounded-2xl overflow-hidden bg-card border border-border shadow-sm p-6 sm:p-8 transition-all hover:border-foreground/30"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden bg-muted">
                <Image
                  src={leadArticle.coverImage || "/placeholder.jpg"}
                  alt={leadArticle.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="text-primary font-semibold uppercase tracking-wider">Featured Essay</span>
                  <span>·</span>
                  <span>{leadArticle.readingMinutes || 4} min read</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {leadArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light line-clamp-3">
                  {leadArticle.excerpt}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold inline-flex items-center gap-1.5 group-hover:underline">
                    <span>Read Dispatch</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Supporting Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {otherArticles.map((entry) => (
            <Link
              key={entry._id.toString()}
              href={`/journal/${entry.slug}`}
              className="group block space-y-4"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted border border-border/70 shadow-sm">
                <Image
                  src={entry.coverImage || "/placeholder.jpg"}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-104"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
                  <span>{new Date(entry.publishedAt || Date.now()).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>·</span>
                  <span>{entry.readingMinutes || 3} min read</span>
                </div>

                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {entry.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                  {entry.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-foreground font-semibold pt-1 group-hover:underline">
                  <span>Read Essay</span>
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
