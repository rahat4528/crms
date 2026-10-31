"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Plus, Layout, Save } from "lucide-react"
import { toast } from "sonner"

export default function StudioPageBuilderPage() {
  const [pageTitle, setPageTitle] = useState("Virga Flagship Atelier")
  const [blocks, setBlocks] = useState([
    { type: "hero", title: "Full Bleed Atelier Photo" },
    { type: "text", title: "Atelier Origin Narrative" },
    { type: "grid", title: "Selected Ceramic Objects" },
  ])

  function addBlock(type: string) {
    setBlocks([...blocks, { type, title: `New ${type.toUpperCase()} Section` }])
    toast.success(`Added ${type} block`)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-border/60">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Visual Page Builder
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Construct bespoke editorial pages using modular content blocks.
          </p>
        </div>

        <Button onClick={() => toast.success("Page published successfully")} size="sm" className="rounded-full text-xs">
          <Save className="h-3.5 w-3.5 mr-1" />
          Publish Page
        </Button>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <Label>Page Title</Label>
          <Input value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} className="rounded-xl font-heading text-lg" />
        </div>

        <div className="space-y-3 pt-2">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Page Block Sequence</Label>
          <div className="space-y-2">
            {blocks.map((b, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/50 border border-border/60 text-xs">
                <div className="flex items-center space-x-2.5">
                  <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-foreground">{b.title}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">({b.type})</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setBlocks(blocks.filter((_, i) => i !== idx))} className="h-7 text-xs text-destructive">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-border/60">
          <Button variant="outline" size="sm" onClick={() => addBlock("hero")} className="rounded-full text-xs">
            <Plus className="h-3 w-3 mr-1" /> Add Hero Block
          </Button>
          <Button variant="outline" size="sm" onClick={() => addBlock("text")} className="rounded-full text-xs">
            <Plus className="h-3 w-3 mr-1" /> Add Editorial Narrative
          </Button>
          <Button variant="outline" size="sm" onClick={() => addBlock("grid")} className="rounded-full text-xs">
            <Plus className="h-3 w-3 mr-1" /> Add Piece Strip
          </Button>
        </div>
      </div>
    </div>
  )
}
