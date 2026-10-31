"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface FilterPanelProps {
  collections?: Array<{ _id: string; title: string; slug: string }>
}

export function FilterPanel({ collections = [] }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get("sort") || "newest"
  const currentCollection = searchParams.get("collection") || "all"
  const isFreshOnly = searchParams.get("fresh") === "true"
  const isOfferOnly = searchParams.get("offer") === "true"

  function updateQuery(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page") // Reset page on filter change
    router.push(`/shop?${params.toString()}`)
  }

  function clearAll() {
    router.push("/shop")
  }

  return (
    <div className="space-y-6 p-5 rounded-2xl bg-card border border-border/80">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <h3 className="font-heading text-base font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
        >
          Reset
        </Button>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Sort By</Label>
        <Select value={currentSort} onValueChange={(val) => updateQuery("sort", val)}>
          <SelectTrigger className="rounded-xl text-sm">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="spotlight">Spotlight First</SelectItem>
            <SelectItem value="best-selling">Top Sellers</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="top-rated">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Collection</Label>
          <Select
            value={currentCollection}
            onValueChange={(val) => updateQuery("collection", val)}
          >
            <SelectTrigger className="rounded-xl text-sm">
              <SelectValue placeholder="All Collections" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Collections</SelectItem>
              {collections.map((col) => (
                <SelectItem key={col._id} value={col._id}>
                  {col.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-border/60">
        <div className="flex items-center justify-between">
          <Label htmlFor="fresh-toggle" className="text-sm font-normal text-foreground cursor-pointer">
            Fresh Arrivals Only
          </Label>
          <Switch
            id="fresh-toggle"
            checked={isFreshOnly}
            onCheckedChange={(checked) => updateQuery("fresh", checked ? "true" : null)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="offer-toggle" className="text-sm font-normal text-foreground cursor-pointer">
            Special Offer Archive
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
}

export default FilterPanel

