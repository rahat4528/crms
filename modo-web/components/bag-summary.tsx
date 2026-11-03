"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/cn"
import { toast } from "sonner"

interface BagSummaryProps {
  subtotal: number
  onApplyPromo?: (code: string) => void
  promoDiscount?: number
}

export function BagSummary({ subtotal, onApplyPromo, promoDiscount = 0 }: BagSummaryProps) {
  const [promoInput, setPromoInput] = useState("")

  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = Math.max(0, subtotal - promoDiscount + shipping + tax)

  function handlePromoSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!promoInput.trim()) return

    const code = promoInput.trim().toUpperCase()
    if (code === "VIRGA10" || code === "MODO10") {
      onApplyPromo?.("VIRGA10")
      toast.success("Promo code VIRGA10 applied (10% off)")
    } else if (code === "FREESHIP") {
      onApplyPromo?.("FREESHIP")
      toast.success("Promo code FREESHIP applied (Free shipping)")
    } else {
      toast.error("Invalid or expired promo code")
    }
  }

  return (
    <div className="p-6 sm:p-7 rounded-xl bg-card border border-border shadow-sm space-y-6">
      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground pb-3 border-b border-border/60">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground tracking-tight">{formatPrice(subtotal)}</span>
        </div>

        {promoDiscount > 0 && (
          <div className="flex justify-between text-primary font-medium">
            <span>Promotional Savings</span>
            <span>-{formatPrice(promoDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Carbon-Neutral Delivery</span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Taxes (8%)</span>
          <span className="font-medium text-foreground tracking-tight">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-border/80 pt-4 flex justify-between text-base font-bold text-foreground">
          <span>Estimated Total</span>
          <span className="font-heading text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo Code Form */}
      <form onSubmit={handlePromoSubmit} className="flex gap-2 pt-1">
        <Input
          placeholder="PROMO CODE"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          className="rounded-lg text-xs font-mono uppercase h-9 bg-background"
        />
        <Button type="submit" variant="outline" className="rounded-lg text-xs px-4 h-9 shrink-0">
          Apply
        </Button>
      </form>

      {subtotal > 0 ? (
        <Button asChild size="lg" className="w-full rounded-full font-medium shadow-sm h-11 text-sm">
          <Link href="/checkout" className="inline-flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button disabled size="lg" className="w-full rounded-full font-medium h-11 text-sm">
          Shopping Bag Empty
        </Button>
      )}

      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-secondary shrink-0" />
        <span>Complimentary returns & 256-bit encrypted checkout</span>
      </div>
    </div>
  )
}

export default BagSummary
