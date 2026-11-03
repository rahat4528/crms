import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HeroBannerDto } from "@/types/home-blocks"

interface HeroBannerProps {
  initialBanner?: HeroBannerDto | null
}

export function HeroBanner({ initialBanner }: HeroBannerProps) {
  const headline = initialBanner?.headline || "Form, Function & Purpose"
  const subline =
    initialBanner?.subline ||
    "An exploration of sculptural silhouettes, unbleached linen, and double-faced virgin wool crafted for intentional daily living."
  const backdrop = initialBanner?.backdrop || "/elegant-fashion-model-in-minimalist-setting.jpg"
  const primaryCta = initialBanner?.primaryCta || { label: "Explore Collection", href: "/shop" }
  const secondaryCta = initialBanner?.secondaryCta || { label: "Atelier Story", href: "/story" }

  return (
    <section className="relative overflow-hidden bg-background border-b border-border/80">
      <div className="container-virga py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text Lockup */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="editorial-caps text-[10px] text-primary">Edition N° 04</span>
                <span className="text-border">·</span>
                <span className="editorial-caps text-[10px]">Autumn / Winter</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.04]">
                {headline}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-normal max-w-lg">
              {subline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full px-8 text-sm font-medium shadow-sm h-11">
                <Link href={primaryCta.href} className="inline-flex items-center gap-2">
                  <span>{primaryCta.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-7 text-sm font-medium border-border/80 hover:bg-muted/50 h-11"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>

            {/* Atelier Craftsmanship Micro-Highlights */}
            <div className="pt-8 border-t border-border/60 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
                  Material Origin
                </p>
                <p className="mt-0.5 text-foreground/70">Biella & Marche Mills</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
                  Production Philosophy
                </p>
                <p className="mt-0.5 text-foreground/70">Small-Batch Tailoring</p>
              </div>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-muted border border-border/80 shadow-sm group">
              <Image
                src={backdrop}
                alt="Virga Collection Autumn / Winter"
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Discreet Image Atelier Stamp */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs space-y-0.5 pointer-events-none drop-shadow">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/80">Tailored Silhouette</p>
                <p className="font-heading font-medium text-sm text-white">Double-Faced Wool & Linen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
