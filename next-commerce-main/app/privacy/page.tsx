import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Elegant Fashion",
  description: "Our privacy policy and how we protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 text-balance">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase,
                subscribe to our newsletter, or contact us for support.
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications with customer service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except as
                described in this policy:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Service providers who assist with our operations</li>
                <li>Payment processors for transaction processing</li>
                <li>Shipping companies for order fulfillment</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
                personalize content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your personal data</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                policy, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">9. International Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your data during international transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif text-foreground mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="text-muted-foreground">
                <p>Email: privacy@elegantfashion.com</p>
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
