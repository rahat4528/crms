"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function CatalogForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [summary, setSummary] = useState("")
  const [price, setPrice] = useState("")
  const [listPrice, setListPrice] = useState("")
  const [stock, setStock] = useState("20")
  const [imageUrl, setImageUrl] = useState("/cashmere-cardigan.jpg")
  const [labels, setLabels] = useState("cashmere, tailoring, essential")

  const [spotlight, setSpotlight] = useState(false)
  const [isFresh, setIsFresh] = useState(true)
  const [isOffer, setIsOffer] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !description || !price) {
      toast.error("Please fill in title, description, and price")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/studio/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          summary,
          price: parseFloat(price),
          listPrice: listPrice ? parseFloat(listPrice) : undefined,
          stock: parseInt(stock, 10) || 0,
          gallery: [{ src: imageUrl, alt: title, isCover: true }],
          labels: labels.split(",").map((l) => l.trim()).filter(Boolean),
          state: "live",
          spotlight,
          isFresh,
          isOffer,
          details: [
            { label: "Craft", value: "Virga Atelier Series" },
            { label: "Care", value: "Specialist dry clean only" },
          ],
        }),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        toast.success("Piece successfully added to catalog!")
        router.push("/studio/catalog")
        router.refresh()
      } else {
        toast.error(data.error?.message || "Failed to create piece")
      }
    } catch (err) {
      console.error(err)
      toast.error("Network error while creating piece")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-3xl border border-border/80 shadow-sm">
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-foreground">Piece Details</h3>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Double-Faced Virgin Wool Coat"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary (One sentence blurb)</Label>
          <Input
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g. Sculptural silhouette crafted from unbleached wool."
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Editorial Description</Label>
          <Textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed narrative on the fiber origin, drape, and finishing…"
            className="rounded-xl min-h-28"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="380"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="listPrice">List Price ($)</Label>
            <Input
              id="listPrice"
              type="number"
              step="0.01"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              placeholder="440"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Initial Stock</Label>
            <Input
              id="stock"
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cover Image Path / URL</Label>
          <Input
            id="image"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/tailored-wool-blazer.jpg"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="labels">Labels (comma-separated)</Label>
          <Input
            id="labels"
            value={labels}
            onChange={(e) => setLabels(e.target.value)}
            placeholder="cashmere, tailored, core"
            className="rounded-xl"
          />
        </div>

        <div className="pt-4 border-t border-border/60 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="spot" className="cursor-pointer">Highlight in Spotlight</Label>
            <Switch id="spot" checked={spotlight} onCheckedChange={setSpotlight} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="fresh" className="cursor-pointer">Mark as Fresh Arrival</Label>
            <Switch id="fresh" checked={isFresh} onCheckedChange={setIsFresh} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="offer" className="cursor-pointer">Include in Seasonal Archive Offer</Label>
            <Switch id="offer" checked={isOffer} onCheckedChange={setIsOffer} />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full shadow-md">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publishing Piece…
          </>
        ) : (
          "Publish Piece to Catalog"
        )}
      </Button>
    </form>
  )
}

export default CatalogForm

