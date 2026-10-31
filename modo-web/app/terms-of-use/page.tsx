import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-12 space-y-8 max-w-3xl">
        <TrailNav items={[{ label: "Terms of Use" }]} />

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Agreement
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Terms of Use
          </h1>
          <p className="text-xs text-muted-foreground">Effective date: October 2026</p>
        </div>

        <div className="prose prose-stone dark:prose-invert space-y-6 text-foreground/80 leading-relaxed text-sm">
          <p>
            Welcome to Modo. By accessing or using our website, purchasing pieces, or engaging with our studio, you agree to be bound by these terms.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">1. Purchase & Pricing</h2>
          <p>
            All prices are quoted in USD unless localized. We reserve the right to correct pricing anomalies or cancel orders resulting from typographical or technical errors.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">2. Complimentary Shipping & Delivery</h2>
          <p>
            Delivery timeframes are estimates and subject to customs verification. Title and risk of loss pass to the client upon tender to the express shipping carrier.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">3. Intellectual Property</h2>
          <p>
            All text, photography, graphic identities, and garment patterns are the exclusive intellectual property of Modo and may not be duplicated without explicit consent.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

