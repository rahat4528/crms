"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Printer, Truck, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const orders = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    email: "olivia@example.com",
    date: "2024-01-15",
    status: "Shipped",
    payment: "Paid",
    total: "$1,999.00",
    items: 3,
  },
  {
    id: "#3209",
    customer: "Jackson Lee",
    email: "jackson@example.com",
    date: "2024-01-14",
    status: "Processing",
    payment: "Paid",
    total: "$39.00",
    items: 1,
  },
  {
    id: "#3208",
    customer: "Isabella Nguyen",
    email: "isabella@example.com",
    date: "2024-01-13",
    status: "Delivered",
    payment: "Paid",
    total: "$299.00",
    items: 2,
  },
  {
    id: "#3207",
    customer: "William Kim",
    email: "william@example.com",
    date: "2024-01-12",
    status: "Pending",
    payment: "Pending",
    total: "$99.00",
    items: 1,
  },
  {
    id: "#3206",
    customer: "Sofia Davis",
    email: "sofia@example.com",
    date: "2024-01-11",
    status: "Cancelled",
    payment: "Refunded",
    total: "$39.00",
    items: 1,
  },
]

export function OrderTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((o) => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Handle status update
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedOrders.length === orders.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/orders/${order.id.replace("#", "")}`} className="font-medium hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Select defaultValue={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.payment === "Paid"
                        ? "default"
                        : order.payment === "Pending"
                          ? "secondary"
                          : order.payment === "Refunded"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{order.total}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/orders/${order.id.replace("#", "")}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Order
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="mr-2 h-4 w-4" />
                        Print Packing Slip
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Process Refund
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <X className="mr-2 h-4 w-4" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
