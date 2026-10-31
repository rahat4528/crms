import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import Image from "next/image"

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-12 space-y-12 max-w-4xl">
        <TrailNav items={[{ label: "Our Story" }]} />

        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            The Philosophy
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Virga was founded on a simple truth: what we wear and live with should age with character, not expire with seasons.
          </h1>
        </div>

        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-sm">
          <Image
            src="/elegant-fashion-atelier.jpg"
            alt="Virga Atelier"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
          <p>
            In an era of relentless novelty and disposable consumption, Virga embraces radical reduction. We craft fewer, better pieces rooted in uncompromised material integrity.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground pt-4">
            Tactile Origin & Ethical Ateliers
          </h2>
          <p>
            We partner exclusively with multi-generational micro-mills in Biella and Marche, Italy, and Porto, Portugal. From pure unbleached Mongolian cashmere to virgin wool and Tuscan vegetable-tanned hides, our fibers originate from certified ethical farming cooperatives.
          </p>

          <h2 className="font-heading text-2xl font-bold text-foreground pt-4">
            Enduring Proportions
          </h2>
          <p>
            Our silhouettes do not chase ephemeral micro-trends. Each pattern is engineered with architectural precision—wide-leg trousers that drape with natural gravity, double-faced wool blazers that retain structure without rigidity, and ceramics that ground everyday living in quiet beauty.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

