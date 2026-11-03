import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Look from "@/models/Look"
import { formatPrice } from "@/lib/cn"

export const revalidate = 60

export default async function LookbookPage() {
  let looks: any[] = []
  try {
    await dbConnect()
    looks = await Look.find({ state: "published" })
      .populate("hotspots.itemId", "title slug price gallery")
      .sort({ publishedAt: -1 })
      .lean()
  } catch (error) {
    console.warn("MongoDB offline during LookbookPage prerender:", error)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-10 sm:py-14 space-y-12">
        <TrailNav items={[{ label: "Lookbook" }]} />

        {/* Lookbook Header */}
        <div className="space-y-3 max-w-2xl pb-4 border-b border-border/70">
          <span className="editorial-caps text-primary">Seasonal Wardrobe Ensembles</span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Shoppable Lookbook
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed font-light">
            Silhouettes styled in natural daylight. Explore each look to inspect individual garment tailoring, fabric textures, and drape.
          </p>
        </div>

        {/* Silhouette Showcases */}
        <div className="space-y-16">
          {looks.map((look, lookIdx) => (
            <div
              key={look._id.toString()}
              className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-sm space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                    Look 0{lookIdx + 1} · {look.season || "Autumn / Winter Series"}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                    {look.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Look Visual */}
                <div className="lg:col-span-7 relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border border-border/70 shadow-sm">
                  <Image
                    src={look.cover}
                    alt={look.title}
                    fill
                    priority={lookIdx === 0}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Hotspot pieces */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      Garments in this Composition
                    </h3>
                    <p className="text-xs text-muted-foreground font-light">
                      Select any garment to view detailed sizing, fiber provenance, and availability.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {look.hotspots?.map((hs: any, idx: number) => {
                      const item = hs.itemId
                      if (!item) return null
                      const cover = item.gallery?.[0]?.src || "/placeholder.jpg"

                      return (
                        <Link
                          key={idx}
                          href={`/shop/${item.slug}`}
                          className="flex items-center gap-3.5 p-3.5 rounded-xl bg-background border border-border/70 hover:border-foreground/40 transition-colors group"
                        >
                          <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/50">
                            <Image src={cover} alt={item.title} fill sizes="56px" className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <p className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold">
                              {hs.note || "Tailored Piece"}
                            </p>
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {item.title}
                            </p>
                            <p className="text-xs font-semibold text-foreground tracking-tight">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
