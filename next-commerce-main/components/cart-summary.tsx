"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Truck, Shield, RotateCcw } from "lucide-react"

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemCount: number
  onApplyCoupon: (code: string) => void
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  itemCount,
  onApplyCoupon,
  onCheckout,
}: CartSummaryProps) {
  const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const code = formData.get("coupon") as string
    if (code.trim()) {
      onApplyCoupon(code.trim())
    }
  }

  const freeShippingThreshold = 100
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="space-y-6">
      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Add ${remainingForFreeShipping.toFixed(2)} more to qualify for free shipping
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupon Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Promo Code</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCouponSubmit} className="flex gap-2">
            <Input name="coupon" placeholder="Enter coupon code" className="flex-1" />
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button size="lg" className="w-full" onClick={onCheckout}>
            Proceed to Checkout
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Fast Ship</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Returns</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
