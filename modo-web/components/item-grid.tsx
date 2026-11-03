import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/cn"
import type { ItemDto } from "@/types/item"

interface ItemGridProps {
  items: ItemDto[]
}

export function ItemGrid({ items }: ItemGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="font-heading text-xl font-bold text-foreground">No pieces match your criteria</p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Please adjust your search keywords or reset active filters to view our full collection.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {items.map((item) => {
        const cover =
          item.gallery?.find((g) => g.isCover)?.src ||
          item.gallery?.[0]?.src ||
          "/placeholder.jpg"
        const hasDiscount = item.listPrice && item.listPrice > item.price
        const collectionName =
          typeof item.collection === "object" && item.collection?.title
            ? item.collection.title
            : null

        return (
          <Link
            key={item._id}
            href={`/shop/${item.slug}`}
            className="group block space-y-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            {/* Image Canvas */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted border border-border/70 shadow-sm transition-all duration-300 group-hover:border-border">
              <Image
                src={cover}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-104"
              />

              {/* Minimalist Status Markers */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                {item.isFresh && (
                  <span className="bg-foreground text-background text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md font-medium shadow-sm">
                    New
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-primary text-primary-foreground text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md font-medium shadow-sm">
                    Sale
                  </span>
                )}
              </div>

              {item.state === "sold-out" && (
                <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] flex items-center justify-center p-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold px-3 py-1 bg-card border border-border rounded-md shadow-sm">
                    Archived / Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Typography & Price Lockup */}
            <div className="space-y-1">
              {collectionName && (
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground truncate">
                  {collectionName}
                </p>
              )}
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
  )
}

export default ItemGrid
