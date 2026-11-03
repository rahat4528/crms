"use client"

import { useState } from "react"
import Image from "next/image"

interface ItemGalleryProps {
  gallery: Array<{ src: string; alt?: string; isCover?: boolean }>
  title: string
}

export function ItemGallery({ gallery = [], title }: ItemGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = gallery.length > 0 ? gallery : [{ src: "/placeholder.jpg", alt: title }]
  const activeImage = images[activeIndex] || images[0]

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-none py-1">
          {images.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border transition-all ${
                activeIndex === idx
                  ? "border-foreground ring-1 ring-foreground"
                  : "border-border/60 hover:border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center transition-opacity duration-300"
        />

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-foreground font-medium border border-border/60">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemGallery
