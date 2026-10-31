import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import type { HomeBlockDto } from "@/types/home-blocks"
import type { ItemDto } from "@/types/item"

interface HomeBlocksProps {
  blocks?: HomeBlockDto[]
}

export function HomeBlocks({ blocks = [] }: HomeBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-20 py-12">
      {blocks.map((block) => {
        const items = (block.items || []) as ItemDto[]
        if (!items || items.length === 0) return null

        return (
          <section key={block._id} className="container-modo">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {block.kind.replace("-", " ")}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                  {block.heading}
                </h2>
                {block.blurb && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                    {block.blurb}
                  </p>
                )}
              </div>
              <Link
                href="/shop"
                className="text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                View collection →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted border border-border/60">
                      <Image
                        src={cover}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.isFresh && (
                        <Badge className="absolute top-3 left-3 bg-foreground text-background text-[11px] font-medium rounded-full px-2.5 py-0.5">
                          New
                        </Badge>
                      )}
                      {hasDiscount && (
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-[11px] font-medium rounded-full px-2.5 py-0.5">
                          Save {Math.round(((item.listPrice! - item.price) / item.listPrice!) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="font-semibold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-muted-foreground line-through">
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
        )
      })}
    </div>
  )
}

export default HomeBlocks

