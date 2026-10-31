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
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-none py-1">
          {images.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? "border-primary ring-2 ring-primary/20"
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
      <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-sm">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  )
}

export default ItemGallery

