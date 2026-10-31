"use client"

import Link from "next/link"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye } from "lucide-react"

export interface OrderRowData {
  _id: string
  orderNo: string
  email: string
  totals: {
    total: number
  }
  state: "pending" | "paid" | "packed" | "shipped" | "delivered" | "cancelled" | "refunded"
  payment: {
    status: string
  }
  lines: Array<{ titleSnapshot: string; qty: number }>
  addedAt: string
}

interface OrdersGridProps {
  orders: OrderRowData[]
}

export function OrdersGrid({ orders = [] }: OrdersGridProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Order #</TableHead>
            <TableHead>Client Email</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No orders recorded yet.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((ord) => {
              const itemsCount = ord.lines.reduce((s, l) => s + l.qty, 0)
              const firstTitle = ord.lines[0]?.titleSnapshot || "Item"

              return (
                <TableRow key={ord._id}>
                  <TableCell className="font-mono font-semibold text-xs text-foreground">
                    {ord.orderNo}
                  </TableCell>
                  <TableCell className="text-sm text-foreground/90">
                    {ord.email}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {firstTitle} {itemsCount > 1 ? `+${itemsCount - 1} more` : ""}
                  </TableCell>
                  <TableCell className="font-semibold text-sm text-foreground">
                    {formatPrice(ord.totals?.total || 0)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ord.state === "delivered"
                          ? "default"
                          : ord.state === "shipped"
                          ? "secondary"
                          : "outline"
                      }
                      className="rounded-full text-[11px] capitalize"
                    >
                      {ord.state}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs capitalize font-medium text-muted-foreground">
                      {ord.payment?.status || "unpaid"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full">
                      <Link href={`/studio/orders/${ord._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersGrid

