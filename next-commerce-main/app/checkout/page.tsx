"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Shield } from "lucide-react"

// Mock cart data for checkout
const mockCartItems = [
  {
    id: 1,
    name: "Silk Midi Dress",
    price: 299,
    originalPrice: 399,
    image: "/elegant-silk-midi-dress.jpg",
    color: "Navy",
    size: "M",
    quantity: 1,
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 189,
    image: "/luxury-cashmere-sweater.png",
    color: "Cream",
    size: "S",
    quantity: 2,
  },
]

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)

  const breadcrumbItems = [
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ]

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckoutSubmit = async (formData: any) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    window.location.href = "/checkout/success"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center gap-2 mb-8">
            <Lock className="h-5 w-5 text-green-600" />
            <h1 className="text-3xl font-light tracking-tight">Secure Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {mockCartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                              {item.quantity}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="text-xs text-muted-foreground">
                              {item.color} • {item.size}
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm">${item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 pt-4 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Your payment information is secure</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
