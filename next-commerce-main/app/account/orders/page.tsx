"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Eye, RotateCcw, MessageCircle } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-2025-001234",
    date: "2025-01-20",
    status: "Processing",
    total: 726.12,
    items: [
      { name: "Silk Midi Dress", quantity: 1, price: 299 },
      { name: "Cashmere Sweater", quantity: 2, price: 189 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: null,
  },
  {
    id: "ORD-2025-001233",
    date: "2025-01-15",
    status: "Delivered",
    total: 299.0,
    items: [{ name: "Silk Midi Dress", quantity: 1, price: 299 }],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567890",
    deliveredDate: "2025-01-18",
  },
  {
    id: "ORD-2025-001232",
    date: "2025-01-10",
    status: "Delivered",
    total: 189.0,
    items: [{ name: "Cashmere Sweater", quantity: 1, price: 189 }],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567891",
    deliveredDate: "2025-01-13",
  },
  {
    id: "ORD-2025-001231",
    date: "2025-01-05",
    status: "Cancelled",
    total: 249.0,
    items: [{ name: "Leather Loafers", quantity: 1, price: 249 }],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: null,
  },
]

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "Order History", href: "/account/orders" },
  ]

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight">Order History</h1>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
            <AccountSidebar />
          </div>

          <div className="flex gap-8">
            <AccountSidebar />

            <div className="flex-1 space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <Card>
                    <CardContent className="py-16 text-center">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "You haven't placed any orders yet"}
                      </p>
                      <Button>Start Shopping</Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                              {order.deliveredDate && (
                                <> • Delivered on {new Date(order.deliveredDate).toLocaleDateString()}</>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                            <div className="text-right">
                              <div className="font-semibold">${order.total.toFixed(2)}</div>
                              <div className="text-sm text-muted-foreground">
                                {order.items.length} item{order.items.length > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Address */}
                        <div className="text-sm text-muted-foreground mb-4">
                          <strong>Shipping to:</strong> {order.shippingAddress}
                        </div>

                        {/* Tracking */}
                        {order.trackingNumber && (
                          <div className="text-sm mb-4">
                            <strong>Tracking Number:</strong> {order.trackingNumber}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {order.status === "Delivered" && (
                            <>
                              <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Return Items
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Write Review
                              </Button>
                            </>
                          )}
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm">
                              Track Package
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
