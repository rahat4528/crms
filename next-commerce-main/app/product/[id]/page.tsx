"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductReviews } from "@/components/product-reviews"
import { ProductQA } from "@/components/product-qa"
import { RelatedProducts } from "@/components/related-products"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Star } from "lucide-react"

// Mock product data
const mockProduct = {
  id: 1,
  name: "Silk Midi Dress",
  price: 299,
  originalPrice: 399,
  description:
    "Crafted from the finest mulberry silk, this midi dress embodies timeless elegance with its flowing silhouette and sophisticated drape. The dress features a classic V-neckline, three-quarter sleeves, and a flattering A-line cut that suits all body types. Perfect for both professional settings and special occasions.",
  images: [
    "/elegant-silk-midi-dress.jpg",
    "/silk-dress-detail-1.jpg",
    "/silk-dress-detail-2.jpg",
    "/silk-dress-styling.jpg",
  ],
  category: "Dresses",
  brand: "Luxe",
  isNew: false,
  isSale: true,
  inStock: true,
  stockCount: 12,
  rating: 4.3,
  reviewCount: 24,
  colors: [
    { name: "Black", value: "black" },
    { name: "Navy", value: "navy" },
    { name: "Burgundy", value: "burgundy" },
  ],
  sizes: [
    { name: "XS", value: "xs", inStock: true },
    { name: "S", value: "s", inStock: true },
    { name: "M", value: "m", inStock: true },
    { name: "L", value: "l", inStock: true },
    { name: "XL", value: "xl", inStock: false },
  ],
  features: ["100% Mulberry Silk", "Dry Clean Only", "Imported", "Model is 5'9\" wearing size S"],
  specifications: {
    Material: "100% Mulberry Silk",
    "Care Instructions": "Dry clean only",
    "Country of Origin": "Italy",
    Fit: "True to size",
    Length: "Midi (below knee)",
    "Sleeve Length": "3/4 sleeve",
  },
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0].value)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const breadcrumbItems = [
    { label: "Shop", href: "/category" },
    { label: mockProduct.category, href: `/category/${mockProduct.category.toLowerCase()}` },
    { label: mockProduct.name, href: `/product/${params.id}` },
  ]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    // Handle add to cart logic
    console.log("Added to cart:", { product: mockProduct, color: selectedColor, size: selectedSize, quantity })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {mockProduct.brand}
                  </Badge>
                  {mockProduct.isNew && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                  {mockProduct.isSale && (
                    <Badge variant="destructive" className="text-xs">
                      Sale
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-light tracking-tight mb-4">{mockProduct.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-light">${mockProduct.price}</span>
                  {mockProduct.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">${mockProduct.originalPrice}</span>
                  )}
                  {mockProduct.isSale && (
                    <Badge variant="destructive">Save ${mockProduct.originalPrice! - mockProduct.price}</Badge>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {mockProduct.inStock ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                      <span className="text-sm">In stock ({mockProduct.stockCount} available)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-sm">Out of stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Color: {mockProduct.colors.find((c) => c.value === selectedColor)?.name}
                </Label>
                <div className="flex gap-3">
                  {mockProduct.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-colors ${
                        selectedColor === color.value ? "border-primary" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProduct.sizes.map((size) => (
                      <SelectItem key={size.value} value={size.value} disabled={!size.inStock}>
                        {size.name} {!size.inStock && "(Out of stock)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Quantity</Label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(Math.min(10, mockProduct.stockCount))].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!mockProduct.inStock || !selectedSize}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <Button size="lg" variant="secondary" className="w-full">
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Free Shipping</div>
                        <div className="text-xs text-muted-foreground">On orders over $100</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RotateCcw className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Easy Returns</div>
                        <div className="text-xs text-muted-foreground">30-day return policy</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Secure Payment</div>
                        <div className="text-xs text-muted-foreground">SSL encrypted</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({mockProduct.reviewCount})</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">{mockProduct.description}</p>
                <h4 className="text-lg font-medium mb-4">Key Features</h4>
                <ul className="space-y-2">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <ProductReviews reviews={[]} averageRating={mockProduct.rating} totalReviews={mockProduct.reviewCount} />
            </TabsContent>

            <TabsContent value="qa" className="mt-8">
              <ProductQA />
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </div>
  )
}
