import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-10 sm:py-14 space-y-16 max-w-5xl">
        <TrailNav items={[{ label: "Our Story" }]} />

        {/* Hero Manifesto */}
        <div className="space-y-6 max-w-3xl">
          <span className="editorial-caps text-primary">Our Purpose & Origin</span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
            What we wear and live with should age with character, not expire with seasons.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
            In an era of relentless novelty and disposable consumption, Virga was established to restore material patience. We build permanent wardrobe foundations and living objects designed to deepen in patina over decades.
          </p>
        </div>

        {/* Atelier Hero Visual */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
          <Image
            src="/elegant-fashion-atelier.jpg"
            alt="Virga Design Atelier"
            fill
            priority
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs space-y-0.5 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/80">Pattern Cutting & Prototyping</p>
            <p className="font-heading font-medium text-sm text-white">SoHo Atelier, New York</p>
          </div>
        </div>

        {/* 3 Pillars of Considered Living */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-border/70">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">01 / Provenance</span>
            <h2 className="font-heading text-xl font-bold text-foreground">Tactile Honesty</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              We partner exclusively with multi-generational micro-mills in Biella and Marche, Italy, and Porto, Portugal. From pure unbleached Mongolian cashmere to virgin wool and Tuscan vegetable-tanned hides, our fibers originate from certified ethical farming cooperatives.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">02 / Tailoring</span>
            <h2 className="font-heading text-xl font-bold text-foreground">Architectural Grace</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Our silhouettes do not chase ephemeral micro-trends. Each pattern is engineered with architectural precision—wide-leg trousers that drape with natural gravity, double-faced wool blazers that retain structure without rigidity.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">03 / Longevity</span>
            <h2 className="font-heading text-xl font-bold text-foreground">Generational Care</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              True luxury is repairable. Every Virga piece includes lifetime repair consults, replacement horn buttons, and tailored care guides to ensure your garments grow more personal with every season of wear.
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div className="p-8 sm:p-12 rounded-2xl bg-card border border-border shadow-sm text-center space-y-4 max-w-3xl mx-auto">
          <p className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
            &ldquo;We measure progress not in how many items we sell, but in how many seasons each piece remains in active rotation.&rdquo;
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Virga Creative Direction · Atelier Dispatches
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary hover:underline font-semibold"
            >
              <span>Explore the Permanent Collection</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
