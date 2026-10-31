import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { HeroBannerDto } from "@/types/home-blocks"

interface HeroBannerProps {
  initialBanner?: HeroBannerDto | null
}

export function HeroBanner({ initialBanner }: HeroBannerProps) {
  const headline = initialBanner?.headline || "Form, Function & Purpose"
  const subline =
    initialBanner?.subline ||
    "Autumn / Winter collection exploring sculptural silhouettes, unbleached linen, and double-faced virgin wool."
  const backdrop = initialBanner?.backdrop || "/elegant-fashion-model-in-minimalist-setting.jpg"
  const primaryCta = initialBanner?.primaryCta || { label: "Explore Collection", href: "/shop" }
  const secondaryCta = initialBanner?.secondaryCta || { label: "Our Story", href: "/story" }

  return (
    <section className="relative overflow-hidden bg-muted/40 min-h-[70vh] flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backdrop}
          alt="Virga Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.88] dark:brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-virga relative z-10 py-24 sm:py-32">
        <div className="max-w-2xl space-y-6">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest bg-background/80 backdrop-blur-md rounded-full text-foreground border border-border/60">
            Considered Living
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
            {headline}
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl font-normal">
            {subline}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full px-7 text-sm font-medium shadow-md">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-7 text-sm font-medium bg-background/80 backdrop-blur-md border-border/80 hover:bg-background"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner

