"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentCategory: Category | null;
  subcategories: string[];
  isActive: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched categories:', data.data)
          setCategories(data.data || [])
        } else {
          console.error('Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Filter only parent categories (no parentCategory)
  console.log('All categories:', categories)
  const parentCategories = categories.filter(cat => !cat.parentCategory)

  console.log('Parent categories:', parentCategories)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight">Modo</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 relative">
            {loading ? (
              <div className="flex items-center space-x-4">
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : (
              parentCategories.map((category) => (
                <div
                  key={category._id}
                  className="relative group"
                  onMouseEnter={() => setHoveredCategory(category._id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories.length > 0 && <ChevronDown className="h-4 w-4" />}
                  </button>

                  {/* Dropdown for subcategories */}
                  {category.subcategories.length > 0 && (
                    <div
                      className={`absolute top-full left-0 mt-1 w-[500px] bg-popover text-popover-foreground border rounded-md shadow-lg z-50 transition-all duration-200 ${hoveredCategory === category._id
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                        }`}
                    >
                      <div className="grid grid-cols-2 gap-1 p-4">
                        {category.subcategories.map((subcatId) => {
                          const subcat = categories.find(cat => cat._id === subcatId);
                          return subcat ? (
                            <Link
                              key={`${category._id}-${subcat._id}`}
                              href={`/category/${subcat.slug}`}
                              className="block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {subcat.name}
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* <Link 
              href="/sale" 
              className="px-3 py-2 text-sm font-medium text-destructive hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              Sale
            </Link> */}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8 ml-4">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
                    </div>
                  ) : (
                    parentCategories.map((category) => (
                      <div key={category._id} className="space-y-2">
                        <Link
                          href={`/category/${category.slug}`}
                          className="font-semibold text-lg hover:text-accent-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        {category.subcategories.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pl-4">
                            {category.subcategories.map((subcatId) => {
                              const subcat = categories.find(cat => cat._id === subcatId);
                              return subcat ? (
                                <Link
                                  key={subcat._id}
                                  href={`/category/${subcat.slug}`}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subcat.name}
                                </Link>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {/* <Link
                    href="/sale"
                    className="text-lg font-semibold text-destructive"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sale
                  </Link> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}