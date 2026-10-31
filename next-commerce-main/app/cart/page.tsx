"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"

// Mock cart data
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
    inStock: true,
    maxQuantity: 5,
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 189,
    image: "/luxury-cashmere-sweater.png",
    color: "Cream",
    size: "S",
    quantity: 2,
    inStock: true,
    maxQuantity: 3,
  },
  {
    id: 3,
    name: "Leather Loafers",
    price: 249,
    image: "/premium-leather-loafers.png",
    color: "Brown",
    size: "9",
    quantity: 1,
    inStock: false,
    maxQuantity: 0,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const breadcrumbItems = [{ label: "Shopping Cart", href: "/cart" }]

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleMoveToWishlist = (id: number) => {
    // Handle move to wishlist logic
    console.log("Move to wishlist:", id)
    handleRemoveItem(id)
  }

  const handleApplyCoupon = (code: string) => {
    // Mock coupon validation
    const validCoupons = ["SAVE10", "WELCOME20", "FREESHIP"]
    if (validCoupons.includes(code.toUpperCase())) {
      setAppliedCoupon(code.toUpperCase())
    } else {
      alert("Invalid coupon code")
    }
  }

  const handleCheckout = () => {
    // Navigate to checkout
    window.location.href = "/checkout"
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 100 ? 0 : 15
  const tax = subtotal * 0.08
  const discount = appliedCoupon === "SAVE10" ? subtotal * 0.1 : appliedCoupon === "WELCOME20" ? subtotal * 0.2 : 0
  const total = subtotal + shipping + tax - discount
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <BreadcrumbNav items={breadcrumbItems} />
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button size="lg" asChild>
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light tracking-tight">Shopping Cart</h1>
            <Button variant="outline" asChild>
              <Link href="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onMoveToWishlist={handleMoveToWishlist}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                  itemCount={itemCount}
                  onApplyCoupon={handleApplyCoupon}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
