import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { formatPrice } from "@/lib/cn"
import type { HomeBlockDto } from "@/types/home-blocks"
import type { ItemDto } from "@/types/item"

interface HomeBlocksProps {
  blocks?: HomeBlockDto[]
}

export function HomeBlocks({ blocks = [] }: HomeBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-24 py-16">
      {blocks.map((block, blockIndex) => {
        const items = (block.items || []) as ItemDto[]
        if (!items || items.length === 0) return null

        return (
          <div key={block._id} className="space-y-16">
            <section className="container-virga">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-border/60">
                <div className="space-y-1">
                  <span className="editorial-caps text-primary">
                    Curated Spotlight · 0{blockIndex + 1}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {block.heading}
                  </h2>
                  {block.blurb && (
                    <p className="text-sm text-muted-foreground max-w-xl leading-relaxed pt-1 font-light">
                      {block.blurb}
                    </p>
                  )}
                </div>
                <Link
                  href="/shop"
                  className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group shrink-0"
                >
                  <span>Explore All ({items.length})</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {items.slice(0, 4).map((item) => {
                  const cover =
                    item.gallery?.find((g) => g.isCover)?.src ||
                    item.gallery?.[0]?.src ||
                    "/placeholder.jpg"
                  const hasDiscount = item.listPrice && item.listPrice > item.price

                  return (
                    <Link
                      key={item._id}
                      href={`/shop/${item.slug}`}
                      className="group block space-y-3"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted border border-border/70 shadow-sm transition-all duration-300 group-hover:border-border">
                        <Image
                          src={cover}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-104"
                        />
                        {item.isFresh && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="bg-foreground text-background text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md font-medium shadow-sm">
                              New
                            </span>
                          </div>
                        )}
                        {hasDiscount && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="bg-primary text-primary-foreground text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md font-medium shadow-sm">
                              Sale
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm pt-0.5">
                          <span className="font-semibold text-foreground tracking-tight">
                            {formatPrice(item.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-muted-foreground line-through font-normal">
                              {formatPrice(item.listPrice!)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Atelier Craftsmanship Editorial Interstitial (Inserted after the first block to break repetitive grid rhythm) */}
            {blockIndex === 0 && (
              <section className="bg-card border-y border-border/80 py-16 sm:py-20">
                <div className="container-virga">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 space-y-6">
                      <span className="editorial-caps text-secondary">The Material Standard</span>
                      <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        &ldquo;We design for the ritual of daily living, choosing fibers that deepen in beauty through wear.&rdquo;
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg font-light">
                        Every yarn in our knitwear and every bolt of linen is sourced from certified ethical cooperatives in Biella and Porto. No synthetic blends, no ephemeral seasonal cycles.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/story"
                          className="text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group underline underline-offset-4"
                        >
                          <span>Discover Our Atelier Mills</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border shadow-sm">
                        <Image
                          src="/minimalist-clothing-rack.jpg"
                          alt="Atelier Tailoring"
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border shadow-sm mt-6">
                        <Image
                          src="/artisan-ceramics-collection.jpg"
                          alt="Artisan Ceramics"
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HomeBlocks
