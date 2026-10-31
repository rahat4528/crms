import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Elegant Fashion",
  description: "Terms and conditions for using our website and services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 text-balance">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Elegant Fashion's website for
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">3. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We strive to provide accurate product information, including descriptions, pricing, and availability.
                However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
                current, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">4. Orders and Payment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By placing an order, you represent that you are at least 18 years old and have the legal capacity to
                enter into this agreement. We reserve the right to refuse or cancel orders at our discretion.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment must be received by us before we ship your order. We accept major credit cards and other payment
                methods as indicated on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will make every effort to ship your order within the timeframe specified. However, delivery dates are
                estimates and we are not responsible for delays caused by shipping carriers or other circumstances
                beyond our control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our return policy allows for returns within 30 days of purchase for unworn items in original condition.
                Please refer to our detailed return policy for complete terms and conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">7. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                website, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall Elegant Fashion or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of New York, United
                States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or
                location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on the website. Your continued use of the website after changes are posted constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-muted-foreground">
                <p>Email: legal@elegantfashion.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Fashion Avenue, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
