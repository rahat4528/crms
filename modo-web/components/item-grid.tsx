import Link from "next/image"
import NextLink from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import type { ItemDto } from "@/types/item"

interface ItemGridProps {
  items: ItemDto[]
}

export function ItemGrid({ items }: ItemGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <p className="text-lg font-medium text-foreground">No pieces found</p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Try clearing or relaxing your search and filters to view more of the catalog.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item) => {
        const cover =
          item.gallery?.find((g) => g.isCover)?.src ||
          item.gallery?.[0]?.src ||
          "/placeholder.jpg"
        const hasDiscount = item.listPrice && item.listPrice > item.price

        return (
          <NextLink
            key={item._id}
            href={`/shop/${item.slug}`}
            className="group block space-y-3"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted border border-border/60">
              <Image
                src={cover}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
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
              {item.state === "sold-out" && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                  <Badge variant="secondary" className="rounded-full text-xs font-semibold uppercase tracking-wider">
                    Sold Out
                  </Badge>
                </div>
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
          </NextLink>
        )
      })}
    </div>
  )
}

export default ItemGrid

