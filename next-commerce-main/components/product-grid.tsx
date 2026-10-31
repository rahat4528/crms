"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  isNew: boolean
  isSale: boolean
  inStock: boolean
  rating: number
  reviewCount: number
  colors: string[]
  sizes: string[]
}

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const ProductCard = ({ product }: { product: Product }) => {
    if (viewMode === "list") {
      return (
        <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex">
            <div className="relative w-48 h-48 overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive" className="text-xs">
                    Sale
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="outline" className="text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {product.brand} • {product.category}
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-lg mb-2 hover:underline">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Colors: </span>
                      {product.colors.slice(0, 3).join(", ")}
                      {product.colors.length > 3 && ` +${product.colors.length - 3} more`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="ghost">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost" onClick={() => setSelectedProduct(product)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button size="sm" disabled={!product.inStock}>
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
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge variant="destructive" className="text-xs">
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="outline" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setSelectedProduct(product)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="sm" className="h-8" disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {product.brand} • {product.category}
          </div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium mb-2 hover:underline">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Quick View Dialog */}
      <Dialog>
        <DialogContent className="max-w-4xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {selectedProduct.brand} • {selectedProduct.category}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-2xl">${selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < selectedProduct.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({selectedProduct.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Available Colors</Label>
                      <div className="flex gap-2 mt-1">
                        {selectedProduct.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center"
                          >
                            <span className="text-xs">{color.charAt(0)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Available Sizes</Label>
                      <div className="flex gap-2 mt-1">
                        {selectedProduct.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" disabled={!selectedProduct.inStock}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
