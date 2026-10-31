"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Printer, Truck, RefreshCw, MessageSquare, MapPin, CreditCard, Package } from "lucide-react"
import Image from "next/image"

interface OrderDetailsProps {
  orderId: string
}

const orderData = {
  id: "#3210",
  date: "January 15, 2024",
  status: "Shipped",
  paymentStatus: "Paid",
  customer: {
    name: "Olivia Martin",
    email: "olivia@example.com",
    phone: "+1 (555) 123-4567",
  },
  shippingAddress: {
    name: "Olivia Martin",
    street: "123 Fashion Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  billingAddress: {
    name: "Olivia Martin",
    street: "123 Fashion Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
  items: [
    {
      id: "1",
      name: "Silk Midi Dress",
      variant: "Size: M, Color: Navy",
      sku: "SMD-001-M-NAV",
      quantity: 2,
      price: 299.99,
      image: "/elegant-silk-midi-dress.jpg",
    },
    {
      id: "2",
      name: "Cashmere Sweater",
      variant: "Size: S, Color: Cream",
      sku: "CS-002-S-CRM",
      quantity: 1,
      price: 199.99,
      image: "/elegant-silk-blouse.jpg",
    },
  ],
  subtotal: 799.97,
  shipping: 15.0,
  tax: 64.0,
  total: 878.97,
  paymentMethod: "Visa ending in 4242",
  shippingMethod: "Standard Shipping (5-7 business days)",
  trackingNumber: "1Z999AA1234567890",
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order {orderData.id}</h1>
          <p className="text-muted-foreground">Placed on {orderData.date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
          <Button variant="outline">
            <Truck className="mr-2 h-4 w-4" />
            Print Packing Slip
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Process Refund
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Order Items */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${item.price} × {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-sm text-muted-foreground">January 16, 2024 at 2:30 PM</p>
                    <p className="text-sm text-muted-foreground">Tracking: {orderData.trackingNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Order Processing</p>
                    <p className="text-sm text-muted-foreground">January 15, 2024 at 10:15 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">January 15, 2024 at 9:45 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Order Status</span>
                <Badge variant="default">{orderData.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment Status</span>
                <Badge variant="default">{orderData.paymentStatus}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">{orderData.customer.name}</p>
              <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
              <p className="text-sm text-muted-foreground">{orderData.customer.phone}</p>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p className="font-medium">{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.street}</p>
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                </p>
                <p>{orderData.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">{orderData.paymentMethod}</p>
              <p className="text-sm text-muted-foreground">{orderData.shippingMethod}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
