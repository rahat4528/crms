import Link from "next/link"
import Image from "next/image"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Look from "@/models/Look"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"

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
      <main className="flex-1 container-virga py-12 space-y-12">
        <TrailNav items={[{ label: "Lookbook" }]} />

        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Visual Harmony
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Shoppable Lookbook
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Curated ensembles captured in natural atelier light. Explore each look to inspect individual garment tailoring.
          </p>
        </div>

        <div className="space-y-16">
          {looks.map((look) => (
            <div
              key={look._id.toString()}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                <div>
                  <Badge variant="outline" className="rounded-full text-[10px] uppercase tracking-wider mb-1">
                    {look.season || "Series"}
                  </Badge>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {look.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Look Visual */}
                <div className="lg:col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted border">
                  <Image
                    src={look.cover}
                    alt={look.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Hotspot pieces */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    Pieces in this Silhouette
                  </h3>
                  <div className="space-y-3">
                    {look.hotspots?.map((hs: any, idx: number) => {
                      const item = hs.itemId
                      if (!item) return null
                      const cover = item.gallery?.[0]?.src || "/placeholder.jpg"

                      return (
                        <Link
                          key={idx}
                          href={`/shop/${item.slug}`}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary transition-colors group"
                        >
                          <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-muted flex-shrink-0 border">
                            <Image src={cover} alt={item.title} fill sizes="56px" className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                              {hs.note || "Garment"}
                            </p>
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                              {item.title}
                            </p>
                            <p className="text-xs font-semibold text-foreground">
                              {formatPrice(item.price)}
                            </p>
                          </div>
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

