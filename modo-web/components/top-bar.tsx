"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react"
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
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
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

    // Read initial bag count from localStorage
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
      setIsMobileSearchOpen(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const isNavActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors">
      {/* Editorial Announcement Bar */}
      <div className="bg-foreground text-background text-[11px] py-1.5 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-3">
        <span>Complimentary Climate-Neutral Delivery Over $150</span>
        <span className="hidden sm:inline opacity-40">·</span>
        <span className="hidden sm:inline opacity-90">Atelier Tailoring & Global Returns</span>
      </div>

      <div className="container-virga">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group py-1">
            <span className="font-heading text-2xl sm:text-[1.75rem] font-bold tracking-tight text-foreground transition-opacity group-hover:opacity-80">
              Virga
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground font-medium -mt-1 hidden sm:block">
              Considered Fashion & Living
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors relative py-1 hover:text-foreground ${
                isNavActive("/shop") && !isNavActive("/collections")
                  ? "text-foreground font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                  : "text-foreground/75"
              }`}
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
                  className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors relative py-1 hover:text-foreground ${
                    isNavActive(`/collections/${col.slug}`)
                      ? "text-foreground font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                      : "text-foreground/75"
                  }`}
                >
                  <span>{col.title}</span>
                </Link>

                {col.children && col.children.length > 0 && hoveredCollection === col._id && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in-50 duration-150">
                    <div className="p-4 bg-popover border border-border shadow-xl rounded-xl space-y-2">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="block pb-2 mb-1 border-b border-border/60 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                      >
                        All {col.title} →
                      </Link>
                      <div className="space-y-1">
                        {col.children.map((child) => (
                          <Link
                            key={child._id}
                            href={`/collections/${child.slug}`}
                            className="block px-2.5 py-1.5 text-sm rounded-md hover:bg-muted text-foreground/90 hover:text-foreground transition-colors"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/journal"
              className={`text-sm font-medium transition-colors relative py-1 hover:text-foreground ${
                isNavActive("/journal")
                  ? "text-foreground font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                  : "text-foreground/75"
              }`}
            >
              Journal
            </Link>
            <Link
              href="/lookbook"
              className={`text-sm font-medium transition-colors relative py-1 hover:text-foreground ${
                isNavActive("/lookbook")
                  ? "text-foreground font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                  : "text-foreground/75"
              }`}
            >
              Lookbook
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, fabric…"
                className="pl-8.5 pr-3 h-8.5 rounded-full bg-muted/50 border-border/70 hover:border-border focus:border-foreground focus:bg-background transition-colors text-xs"
              />
            </div>
          </form>

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {/* Mobile Search Icon Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden rounded-full text-foreground/80 hover:text-foreground h-9 w-9"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full text-foreground/80 hover:text-foreground h-9 w-9"
            >
              <Link href="/me" aria-label="Client Account">
                <User className="h-4.5 w-4.5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full text-foreground/80 hover:text-foreground h-9 w-9"
            >
              <Link href="/bag" aria-label="Shopping Bag">
                <ShoppingBag className="h-4.5 w-4.5" />
                {bagCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-primary text-primary-foreground flex items-center justify-center border-none">
                    {bagCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Hamburger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-full h-9 w-9 text-foreground/80 hover:text-foreground"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[310px] sm:w-[380px] p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-heading text-2xl font-bold tracking-tight text-foreground"
                    >
                      Virga
                    </Link>
                  </div>

                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search collection, fabric…"
                        className="pl-8.5 rounded-full bg-muted text-xs h-9"
                      />
                    </div>
                  </form>

                  <div className="space-y-1">
                    <p className="editorial-caps text-muted-foreground px-1 pb-2">Collections</p>
                    <Link
                      href="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Shop All
                    </Link>
                    {collections.map((c) => (
                      <Link
                        key={c._id}
                        href={`/collections/${c.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1 pt-4 border-t border-border/60">
                    <p className="editorial-caps text-muted-foreground px-1 pb-2">Editorial</p>
                    <Link
                      href="/journal"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      The Virga Journal
                    </Link>
                    <Link
                      href="/lookbook"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      Shoppable Lookbook
                    </Link>
                    <Link
                      href="/story"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      Our Philosophy & Ateliers
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Atelier Portal</span>
                    <Link
                      href="/studio"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>Virga Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-muted-foreground/80">
                    © {new Date().getFullYear()} Virga · Considered Fashion & Living
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Expandable Search Row */}
        {isMobileSearchOpen && (
          <div className="md:hidden py-2.5 pb-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, fabric, pieces…"
                className="pl-8.5 pr-8 rounded-full bg-muted text-xs h-9"
              />
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar
