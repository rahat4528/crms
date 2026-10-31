"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Edit, Search } from "lucide-react"
import { toast } from "sonner"
import type { ItemDto } from "@/types/item"

interface CatalogTableProps {
  initialItems: ItemDto[]
}

export function CatalogTable({ initialItems = [] }: CatalogTableProps) {
  const [items, setItems] = useState<ItemDto[]>(initialItems)
  const [search, setSearch] = useState("")
  const [filterState, setFilterState] = useState<string>("all")

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesState = filterState === "all" || item.state === filterState
    return matchesSearch && matchesState
  })

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this piece?")) return
    try {
      const res = await fetch(`/api/catalog/${id}`, { method: "DELETE" })
      if (res.ok) {
        setItems(items.filter((i) => i._id !== id))
        toast.success("Piece deleted from catalog")
      } else {
        toast.error("Failed to delete piece")
      }
    } catch {
      toast.error("Network error")
    }
  }

  async function handleStateToggle(id: string, currentState: string) {
    const nextState = currentState === "live" ? "paused" : "live"
    try {
      const res = await fetch(`/api/catalog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: nextState }),
      })
      if (res.ok) {
        setItems(
          items.map((i) => (i._id === id ? { ...i, state: nextState as ItemDto["state"] } : i))
        )
        toast.success(`Piece state set to ${nextState}`)
      }
    } catch {
      toast.error("Failed to update status")
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter catalog pieces…"
            className="pl-9 rounded-xl text-sm"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["all", "live", "draft", "paused", "sold-out"].map((st) => (
            <Button
              key={st}
              variant={filterState === st ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterState(st)}
              className="rounded-full text-xs capitalize"
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">Piece</TableHead>
              <TableHead>Title & Details</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No catalog items matching criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => {
                const cover =
                  item.gallery?.find((g) => g.isCover)?.src ||
                  item.gallery?.[0]?.src ||
                  "/placeholder.jpg"

                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="relative h-12 w-10 rounded-lg overflow-hidden bg-muted border">
                        <Image src={cover} alt={item.title} fill sizes="40px" className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground block">{item.title}</span>
                      <span className="text-xs text-muted-foreground">/{item.slug}</span>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          item.stock === 0
                            ? "bg-destructive/15 text-destructive"
                            : item.stock < 10
                            ? "bg-amber-500/15 text-amber-600"
                            : "bg-secondary/15 text-secondary"
                        }`}
                      >
                        {item.stock} in stock
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleStateToggle(item._id, item.state)}
                        className="cursor-pointer"
                      >
                        <Badge
                          variant={item.state === "live" ? "default" : "secondary"}
                          className="rounded-full text-[11px] capitalize"
                        >
                          {item.state}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full">
                        <Link href={`/shop/${item.slug}`} target="_blank">
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item._id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CatalogTable

