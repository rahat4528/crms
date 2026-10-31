import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"

export default function PrivacyNoticePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-12 space-y-8 max-w-3xl">
        <TrailNav items={[{ label: "Privacy Notice" }]} />

        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Compliance
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Privacy Notice
          </h1>
          <p className="text-xs text-muted-foreground">Last updated: October 2026</p>
        </div>

        <div className="prose prose-stone dark:prose-invert space-y-6 text-foreground/80 leading-relaxed text-sm">
          <p>
            Modo (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) values your personal privacy. This notice outlines how your data is collected, processed, and safeguarded when interacting with our storefront, concierge, and digital experiences.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide directly to us: contact details (name, email, phone number), delivery addresses, and payment authentication details handled securely via PCI-DSS compliant providers.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">2. Purpose of Processing</h2>
          <p>
            Your information is used strictly to fulfill orders, provide concierge customer service, ensure secure transaction verification, and transmit our editorial dispatches where subscribed.
          </p>

          <h2 className="font-heading text-lg font-bold text-foreground">3. Data Retention & Your Rights</h2>
          <p>
            You retain the right to access, rectify, or request deletion of your personal data at any time by contacting privacy@modo.store.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

