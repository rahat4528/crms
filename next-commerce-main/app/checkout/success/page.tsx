import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = "ORD-2025-001234"
  const estimatedDelivery = "January 25, 2025"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-light tracking-tight mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>

            {/* Order Details */}
            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Details</span>
                  <Badge variant="secondary">{orderNumber}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Order Number</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date</span>
                  <span className="font-medium">January 20, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium">{estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-semibold">$726.12</span>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Order Confirmation Email</div>
                    <div className="text-sm text-muted-foreground">
                      We've sent a confirmation email with your order details to your email address.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Order Processing</div>
                    <div className="text-sm text-muted-foreground">
                      Your order is being prepared for shipment. This usually takes 1-2 business days.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Shipping Updates</div>
                    <div className="text-sm text-muted-foreground">
                      You'll receive tracking information once your order ships.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/account/orders">View Order Status</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Support */}
            <div className="mt-12 pt-8 border-t text-center">
              <p className="text-muted-foreground mb-4">Need help with your order?</p>
              <Button variant="ghost" asChild>
                <Link href="/contact">Contact Customer Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
