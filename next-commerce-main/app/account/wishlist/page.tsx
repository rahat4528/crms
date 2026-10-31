"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, X, Grid, List } from "lucide-react"

const mockWishlistItems = [
  {
    id: 1,
    name: "Silk Midi Dress",
    price: 299,
    originalPrice: 399,
    image: "/elegant-silk-midi-dress.jpg",
    category: "Dresses",
    brand: "Luxe",
    inStock: true,
    dateAdded: "2025-01-15",
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 189,
    image: "/luxury-cashmere-sweater.png",
    category: "Tops",
    brand: "Premium",
    inStock: true,
    dateAdded: "2025-01-12",
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 599,
    image: "/luxury-designer-handbag.jpg",
    category: "Accessories",
    brand: "Modern",
    inStock: false,
    dateAdded: "2025-01-10",
  },
  {
    id: 4,
    name: "Minimalist Watch",
    price: 199,
    image: "/minimalist-luxury-watch.jpg",
    category: "Accessories",
    brand: "Timeless",
    inStock: true,
    dateAdded: "2025-01-08",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "Wishlist", href: "/account/wishlist" },
  ]

  const handleRemoveItem = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const handleAddToCart = (id: number) => {
    // Handle add to cart logic
    console.log("Add to cart:", id)
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "oldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const WishlistItem = ({ item }: { item: (typeof mockWishlistItems)[0] }) => {
    if (viewMode === "list") {
      return (
        <Card className="overflow-hidden">
          <div className="flex">
            <div className="w-32 h-32 flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.brand} • {item.category}
                  </div>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-medium text-lg mb-2 hover:underline">{item.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-lg">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Added on {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                  {!item.inStock && (
                    <Badge variant="outline" className="mb-4">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleAddToCart(item.id)} disabled={!item.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      )
    }

    return (
      <Card className="group overflow-hidden">
        <div className="relative">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 h-8 w-8"
            onClick={() => handleRemoveItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          {!item.inStock && (
            <div className="absolute top-3 left-3">
              <Badge variant="outline">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {item.brand} • {item.category}
          </div>
          <Link href={`/product/${item.id}`}>
            <h3 className="font-medium mb-2 hover:underline">{item.name}</h3>
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold">${item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            Added {new Date(item.dateAdded).toLocaleDateString()}
          </div>
          <Button size="sm" className="w-full" onClick={() => handleAddToCart(item.id)} disabled={!item.inStock}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {item.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight">My Wishlist</h1>
              <p className="text-muted-foreground">{wishlistItems.length} saved items</p>
            </div>
            <AccountSidebar />
          </div>

          <div className="flex gap-8">
            <AccountSidebar />

            <div className="flex-1">
              {wishlistItems.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Save items you love to your wishlist and shop them later.
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Wishlist Items */}
                  <div
                    className={
                      viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
                    }
                  >
                    {sortedItems.map((item) => (
                      <WishlistItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
