"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, User, Menu, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface CollectionItem {
  _id: string
  title: string
  slug: string
  children?: Array<{ _id: string; title: string; slug: string }>
}

export function TopBar() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [bagCount, setBagCount] = useState(0)

  useEffect(() => {
    async function loadCollections() {
      try {
        const res = await fetch("/api/collections?includeChildren=true")
        if (res.ok) {
          const data = await res.json()
          if (data.ok && Array.isArray(data.items)) {
            setCollections(data.items)
          }
        }
      } catch (err) {
        console.error("Failed to load collections:", err)
      }
    }
    loadCollections()

    // Read initial bag count from localStorage if available
    if (typeof window !== "undefined") {
      try {
        const storedBag = localStorage.getItem("virga_bag") || localStorage.getItem("modo_bag")
        if (storedBag) {
          const parsed = JSON.parse(storedBag)
          if (Array.isArray(parsed)) {
            setBagCount(parsed.reduce((sum: number, item: { qty?: number }) => sum + (item.qty || 1), 0))
          }
        }
      } catch {
        // ignore
      }
    }
  }, [])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="container-virga">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Virga
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/shop"
              className="px-3 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors text-foreground/90"
            >
              Shop All
            </Link>

            {collections.slice(0, 5).map((col) => (
              <div
                key={col._id}
                className="relative"
                onMouseEnter={() => setHoveredCollection(col._id)}
                onMouseLeave={() => setHoveredCollection(null)}
              >
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors text-foreground/90"
                >
                  <span>{col.title}</span>
                  {col.children && col.children.length > 0 && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>

                {col.children && col.children.length > 0 && hoveredCollection === col._id && (
                  <div className="absolute top-full left-0 mt-1 w-64 p-3 bg-popover border border-border rounded-2xl shadow-xl z-50 animate-in fade-in-50 duration-150">
                    <div className="space-y-1">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                      >
                        All {col.title}
                      </Link>
                      {col.children.map((child) => (
                        <Link
                          key={child._id}
                          href={`/collections/${child.slug}`}
                          className="block px-3 py-1.5 text-sm rounded-lg hover:bg-muted text-foreground transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/journal"
              className="px-3 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors text-foreground/90"
            >
              Journal
            </Link>
            <Link
              href="/lookbook"
              className="px-3 py-2 text-sm font-medium rounded-full hover:bg-muted transition-colors text-foreground/90"
            >
              Lookbook
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pieces, materials…"
                className="pl-9 pr-4 h-9 rounded-full bg-muted/60 border-transparent focus:border-border text-sm"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full text-foreground/80 hover:text-foreground">
              <Link href="/me" aria-label="Account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative rounded-full text-foreground/80 hover:text-foreground">
              <Link href="/bag" aria-label="Shopping Bag">
                <ShoppingBag className="h-5 w-5" />
                {bagCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground flex items-center justify-center">
                    {bagCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[380px] p-6">
                <div className="flex flex-col space-y-6 mt-6">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading text-2xl font-bold tracking-tight text-foreground"
                  >
                    Virga
                  </Link>

                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pieces…"
                      className="rounded-full bg-muted text-sm"
                    />
                  </form>

                  <div className="flex flex-col space-y-3 pt-2 border-t">
                    <Link
                      href="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Shop All
                    </Link>
                    {collections.map((c) => (
                      <Link
                        key={c._id}
                        href={`/collections/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {c.title}
                      </Link>
                    ))}
                    <Link
                      href="/journal"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Journal
                    </Link>
                    <Link
                      href="/lookbook"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Lookbook
                    </Link>
                    <Link
                      href="/story"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/studio"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs uppercase tracking-widest text-primary pt-4 font-semibold"
                    >
                      Virga Studio →
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar

