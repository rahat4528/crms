"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterPanelProps {
  collections?: Array<{ _id: string; title: string; slug: string }>
}

export function FilterPanel({ collections = [] }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const currentSort = searchParams.get("sort") || "newest"
  const currentCollection = searchParams.get("collection") || "all"
  const isFreshOnly = searchParams.get("fresh") === "true"
  const isOfferOnly = searchParams.get("offer") === "true"

  const activeFiltersCount =
    (currentCollection !== "all" ? 1 : 0) +
    (isFreshOnly ? 1 : 0) +
    (isOfferOnly ? 1 : 0) +
    (currentSort !== "newest" ? 1 : 0)

  function updateQuery(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page")
    router.push(`/shop?${params.toString()}`)
  }

  function clearAll() {
    router.push("/shop")
    setIsMobileDrawerOpen(false)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
            Filter & Refine
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-[10px] font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground h-7 px-2 font-mono"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <Label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Sort Catalog
        </Label>
        <Select value={currentSort} onValueChange={(val) => updateQuery("sort", val)}>
          <SelectTrigger className="rounded-lg text-xs h-9 border-border bg-background">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="spotlight">Spotlight Pieces</SelectItem>
            <SelectItem value="best-selling">Most Sought</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="top-rated">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div className="space-y-2">
          <Label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Collection Series
          </Label>
          <Select
            value={currentCollection}
            onValueChange={(val) => updateQuery("collection", val)}
          >
            <SelectTrigger className="rounded-lg text-xs h-9 border-border bg-background">
              <SelectValue placeholder="All Collections" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="all">All Series</SelectItem>
              {collections.map((col) => (
                <SelectItem key={col._id} value={col._id}>
                  {col.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Fast Toggles */}
      <div className="space-y-4 pt-2 border-t border-border/60">
        <div className="flex items-center justify-between">
          <Label htmlFor="fresh-toggle" className="text-xs font-medium text-foreground cursor-pointer">
            Fresh Arrivals
          </Label>
          <Switch
            id="fresh-toggle"
            checked={isFreshOnly}
            onCheckedChange={(checked) => updateQuery("fresh", checked ? "true" : null)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="offer-toggle" className="text-xs font-medium text-foreground cursor-pointer">
            Seasonal Archives & Offers
          </Label>
          <Switch
            id="offer-toggle"
            checked={isOfferOnly}
            onCheckedChange={(checked) => updateQuery("offer", checked ? "true" : null)}
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <aside className="hidden lg:block p-6 rounded-xl bg-card border border-border/80 shadow-sm sticky top-24">
        <FilterContent />
      </aside>

      {/* Mobile Drawer Trigger (visible on mobile/tablet) */}
      <div className="lg:hidden flex items-center justify-between w-full p-3 rounded-lg bg-card border border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Filter Pieces
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-[10px] font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>

        <Sheet open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-full text-xs h-8 gap-1.5 px-3">
              <SlidersHorizontal className="h-3 w-3" />
              <span>Filters & Sort</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <SheetHeader className="pb-4 border-b border-border">
              <SheetTitle className="font-heading text-lg">Filters & Sort</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
            <div className="pt-4 border-t border-border flex gap-3">
              <Button
                variant="outline"
                onClick={clearAll}
                className="flex-1 rounded-full text-xs"
              >
                Reset All
              </Button>
              <Button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 rounded-full text-xs"
              >
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default FilterPanel
