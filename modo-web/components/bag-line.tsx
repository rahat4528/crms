"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/cn"

export interface BagItemData {
  id: string
  itemId: string
  title: string
  slug: string
  price: number
  image: string
  qty: number
  optionLabel?: string
  optionSku?: string
}

interface BagLineProps {
  item: BagItemData
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
}

export function BagLine({ item, onUpdateQty, onRemove }: BagLineProps) {
  return (
    <div className="flex items-center gap-4 py-5 border-b border-border/60">
      <Link
        href={`/shop/${item.slug}`}
        className="relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-muted border border-border/60"
      >
        <Image
          src={item.image || "/placeholder.jpg"}
          alt={item.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-1">
        <Link
          href={`/shop/${item.slug}`}
          className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
        >
          {item.title}
        </Link>
        {item.optionLabel && (
          <p className="text-xs text-muted-foreground">{item.optionLabel}</p>
        )}
        <p className="text-sm font-semibold text-foreground pt-1">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-full border border-border bg-card px-2 py-1 space-x-2">
          <button
            onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
            className="p-0.5 hover:text-primary text-muted-foreground transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="text-xs font-semibold px-1 min-w-4 text-center">
            {item.qty}
          </span>
          <button
            onClick={() => onUpdateQty(item.id, item.qty + 1)}
            className="p-0.5 hover:text-primary text-muted-foreground transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-full"
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default BagLine

