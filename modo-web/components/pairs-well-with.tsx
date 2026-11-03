import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/cn"
import type { ItemDto } from "@/types/item"

interface PairsWellWithProps {
  items: ItemDto[]
}

export function PairsWellWith({ items = [] }: PairsWellWithProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="pt-16 border-t border-border/80 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <span className="editorial-caps text-primary">Harmonious Tailoring</span>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground mt-1">
            Pairs Well With
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {items.slice(0, 4).map((item) => {
          const cover =
            item.gallery?.find((g) => g.isCover)?.src ||
            item.gallery?.[0]?.src ||
            "/placeholder.jpg"

          return (
            <Link
              key={item._id}
              href={`/shop/${item.slug}`}
              className="group block space-y-2.5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted border border-border/70 shadow-sm transition-all duration-300 group-hover:border-border">
                <Image
                  src={cover}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-104"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  {formatPrice(item.price)}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default PairsWellWith
