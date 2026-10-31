"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Filter, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React from "react"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Silk Midi Dress",
    price: 299,
    originalPrice: 399,
    image: "/elegant-silk-midi-dress.jpg",
    category: "Dresses",
    brand: "Luxe",
    isNew: false,
    isSale: true,
    inStock: true,
    rating: 4,
    reviewCount: 24,
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    price: 189,
    image: "/luxury-cashmere-sweater.png",
    category: "Tops",
    brand: "Premium",
    isNew: true,
    isSale: false,
    inStock: true,
    rating: 5,
    reviewCount: 18,
    colors: ["Cream", "Gray", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Leather Loafers",
    price: 249,
    image: "/premium-leather-loafers.png",
    category: "Shoes",
    brand: "Classic",
    isNew: false,
    isSale: false,
    inStock: true,
    rating: 4,
    reviewCount: 31,
    colors: ["Brown", "Black"],
    sizes: ["7", "8", "9", "10", "11"],
  },
  {
    id: 4,
    name: "Wool Blazer",
    price: 349,
    originalPrice: 449,
    image: "/tailored-wool-blazer.jpg",
    category: "Outerwear",
    brand: "Elite",
    isNew: false,
    isSale: true,
    inStock: false,
    rating: 5,
    reviewCount: 12,
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Designer Handbag",
    price: 599,
    image: "/luxury-designer-handbag.jpg",
    category: "Accessories",
    brand: "Modern",
    isNew: true,
    isSale: false,
    inStock: true,
    rating: 4,
    reviewCount: 8,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
  },
  {
    id: 6,
    name: "Minimalist Watch",
    price: 199,
    image: "/minimalist-luxury-watch.jpg",
    category: "Accessories",
    brand: "Timeless",
    isNew: false,
    isSale: false,
    inStock: true,
    rating: 4,
    reviewCount: 45,
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
  },
]

export default function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState<{ categories?: string[]; brands?: string[]; priceRange?: [number, number]; inStockOnly?: boolean }>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { slug } = React.use(params)
  const categoryName = slug[0] || "all"
  const subcategoryName = slug[1] || ""

  const breadcrumbItems = [
    { label: "Shop", href: "/category" },
    { label: categoryName.charAt(0).toUpperCase() + categoryName.slice(1), href: `/category/${categoryName}` },
    ...(subcategoryName
      ? [
          {
            label: subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1),
            href: `/category/${categoryName}/${subcategoryName}`,
          },
        ]
      : []),
  ]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts

    // Apply filters
    if ((filters.categories ?? []).length > 0) {
      filtered = filtered.filter((product) => (filters.categories ?? []).includes(product.category))
    }
    if ((filters.brands ?? []).length > 0) {
      filtered = filtered.filter((product) => (filters.brands ?? []).includes(product.brand))
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange as [number, number]
      filtered = filtered.filter((product) => product.price >= min && product.price <= max)
    }
    if (filters.inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Keep original order for "featured"
        break
    }

    return filtered
  }, [filters, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">
                {subcategoryName
                  ? `${subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1)}`
                  : `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`}
              </h1>
              <p className="text-muted-foreground">{filteredAndSortedProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
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

              {/* Mobile Filter Toggle */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <ProductFilters onFiltersChange={setFilters} activeFilters={filters} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters onFiltersChange={setFilters} activeFilters={filters} />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                <ProductGrid products={filteredAndSortedProducts} viewMode={viewMode} />
              ) : (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                  <Button onClick={() => setFilters({})}>Clear all filters</Button>
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
