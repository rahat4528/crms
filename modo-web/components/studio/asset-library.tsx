"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UploadCloud, Check } from "lucide-react"
import { toast } from "sonner"

const SAMPLE_ASSETS = [
  { id: "1", src: "/cashmere-cardigan.jpg", name: "cashmere-cardigan.jpg", size: "108 KB" },
  { id: "2", src: "/tailored-wool-blazer.jpg", name: "tailored-wool-blazer.jpg", size: "116 KB" },
  { id: "3", src: "/tailored-trousers.jpg", name: "tailored-trousers.jpg", size: "48 KB" },
  { id: "4", src: "/premium-leather-loafers.png", name: "premium-leather-loafers.png", size: "904 KB" },
  { id: "5", src: "/luxury-designer-handbag.jpg", name: "luxury-designer-handbag.jpg", size: "72 KB" },
  { id: "6", src: "/elegant-silk-blouse.jpg", name: "elegant-silk-blouse.jpg", size: "56 KB" },
  { id: "7", src: "/pearl-necklace.jpg", name: "pearl-necklace.jpg", size: "117 KB" },
  { id: "8", src: "/minimalist-luxury-watch.jpg", name: "minimalist-luxury-watch.jpg", size: "90 KB" },
]

export function AssetLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function copyPath(asset: { id: string; src: string }) {
    navigator.clipboard.writeText(asset.src)
    setCopiedId(asset.id)
    toast.success(`Copied path: ${asset.src}`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div className="p-8 rounded-3xl border-2 border-dashed border-border/80 bg-card/60 flex flex-col items-center justify-center text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
          <UploadCloud className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground text-sm">Upload Visual Assets</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Drag and drop images or select from device (AVIF, WebP, JPG, PNG up to 10MB)
          </p>
        </div>
        <Button size="sm" variant="outline" className="rounded-full text-xs">
          Select Files
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SAMPLE_ASSETS.map((asset) => (
          <div
            key={asset.id}
            onClick={() => copyPath(asset)}
            className="group relative rounded-2xl border border-border/80 overflow-hidden bg-card p-2 space-y-2 cursor-pointer hover:border-primary transition-all"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <Image src={asset.src} alt={asset.name} fill sizes="160px" className="object-cover" />
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono text-foreground truncate max-w-[120px]">
                {asset.name}
              </span>
              {copiedId === asset.id ? (
                <Check className="h-3.5 w-3.5 text-secondary flex-shrink-0" />
              ) : (
                <span className="text-[10px] text-muted-foreground">{asset.size}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetLibrary

