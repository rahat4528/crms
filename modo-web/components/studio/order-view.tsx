"use client"

import { useState } from "react"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface OrderViewProps {
  order: {
    _id: string
    orderNo: string
    email: string
    state: string
    totals: {
      subtotal: number
      discount: number
      shipping: number
      tax: number
      total: number
    }
    shipTo: {
      fullName: string
      street: string
      city: string
      state?: string
      postalCode: string
      country: string
    }
    lines: Array<{
      titleSnapshot: string
      qty: number
      unitPrice: number
      imageSnapshot?: string
    }>
    timeline: Array<{
      state: string
      at: string
      note?: string
    }>
    addedAt: string
  }
}

export function OrderView({ order }: OrderViewProps) {
  const [currentState, setCurrentState] = useState(order.state)

  async function handleStateChange(newState: string) {
    try {
      setCurrentState(newState)
      toast.success(`Order status updated to ${newState}`)
    } catch {
      toast.error("Failed to update status")
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {order.orderNo}
            </h2>
            <Badge variant="outline" className="rounded-full text-xs capitalize">
              {currentState}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Placed on {new Date(order.addedAt).toLocaleDateString()} by {order.email}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={currentState} onValueChange={handleStateChange}>
            <SelectTrigger className="w-40 rounded-full text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="packed">Packed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-full text-xs">
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Lines */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
          <h3 className="font-heading text-lg font-bold text-foreground">Items in Order</h3>
          <div className="divide-y divide-border/60">
            {order.lines.map((line, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-foreground">{line.titleSnapshot}</p>
                  <p className="text-xs text-muted-foreground">Qty: {line.qty} × {formatPrice(line.unitPrice)}</p>
                </div>
                <span className="font-semibold">{formatPrice(line.unitPrice * line.qty)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/80 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(order.totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.totals.shipping === 0 ? "Complimentary" : formatPrice(order.totals.shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Sales Tax</span>
              <span>{formatPrice(order.totals.tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border/60">
              <span>Total</span>
              <span>{formatPrice(order.totals.total)}</span>
            </div>
          </div>
        </div>

        {/* Client & Shipping Information */}
        <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
          <h3 className="font-heading text-lg font-bold text-foreground">Delivery Address</h3>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-foreground">{order.shipTo.fullName}</p>
            <p className="text-muted-foreground">{order.shipTo.street}</p>
            <p className="text-muted-foreground">
              {order.shipTo.city}, {order.shipTo.state} {order.shipTo.postalCode}
            </p>
            <p className="text-muted-foreground">{order.shipTo.country}</p>
          </div>

          <div className="pt-4 border-t border-border/60 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Order Timeline
            </h4>
            <div className="space-y-2">
              {order.timeline?.map((t, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-medium text-foreground block">{t.state}</span>
                  <span className="text-muted-foreground text-[11px]">
                    {new Date(t.at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView

