import Link from "next/link"
import Image from "next/image"
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-12 space-y-10">
        <TrailNav items={[{ label: "Journal" }]} />

        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Editorial Dispatches
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            The Virga Journal
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Essays, atelier visits, and reflections on intentional craft, fiber provenance, and quiet living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry) => (
            <Link
              key={entry._id.toString()}
              href={`/journal/${entry.slug}`}
              className="group block space-y-4"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted border border-border/60 shadow-sm">
                <Image
                  src={entry.coverImage || "/placeholder.jpg"}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{new Date(entry.publishedAt || Date.now()).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>{entry.readingMinutes || 3} min read</span>
                </div>

                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {entry.title}
                </h2>

                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {entry.excerpt}
                </p>

                <span className="inline-block text-xs font-semibold text-primary pt-1 group-hover:underline">
                  Read article →
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

