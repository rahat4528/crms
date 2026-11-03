"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerNav = [
  {
    title: "Catalog",
    links: [
      { name: "Shop All", href: "/shop" },
      { name: "Apparel", href: "/collections/apparel" },
      { name: "Knitwear", href: "/collections/knitwear" },
      { name: "Footwear", href: "/collections/footwear" },
      { name: "Living & Objects", href: "/collections/living-and-objects" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { name: "Atelier Appointments", href: "/reach-us" },
      { name: "Care & Maintenance", href: "/help" },
      { name: "Fit & Tailoring Guide", href: "/fit-guide" },
      { name: "Client Portal & Orders", href: "/me" },
    ],
  },
  {
    title: "Editorial",
    links: [
      { name: "Our Philosophy", href: "/story" },
      { name: "The Virga Journal", href: "/journal" },
      { name: "Shoppable Lookbook", href: "/lookbook" },
      { name: "Virga Studio Admin", href: "/studio" },
    ],
  },
  {
    title: "Standards",
    links: [
      { name: "Material Traceability", href: "/story" },
      { name: "Privacy Policy", href: "/privacy-notice" },
      { name: "Terms of Service", href: "/terms-of-use" },
    ],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="border-t border-border/80 bg-card mt-auto text-foreground">
      <div className="container-virga py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* Brand Manifesto & Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                Virga
              </span>
              <span className="block text-[9px] uppercase tracking-[0.24em] text-muted-foreground font-medium">
                Considered Fashion & Living
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              Crafted with purpose, tactile material provenance, and sculptural proportions designed to endure seasons.
            </p>

            <div className="pt-2 space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold">
                Receive the Virga Dispatches
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-secondary font-medium py-2">
                  <Check className="h-4 w-4" />
                  <span>Thank you. You have been added to our private dispatch.</span>
                </div>
              ) : (
                <form className="flex space-x-2 max-w-sm" onSubmit={handleSubscribe}>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="rounded-full bg-background border-border text-xs h-9.5"
                  />
                  <Button type="submit" size="sm" className="rounded-full px-5 text-xs h-9.5 shrink-0">
                    <span>Join</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerNav.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-foreground font-semibold">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Atelier Locations & Provenance Row */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-muted-foreground border-b border-border/60">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
              Atelier New York
            </p>
            <p className="mt-0.5">45 Mercer Street, SoHo · Appointments Open</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
              Studio Paris
            </p>
            <p className="mt-0.5">14 Rue Saint-Honoré, 1er · By Consultation</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground font-semibold">
              Traceability Commitment
            </p>
            <p className="mt-0.5">100% Certified Ethical Mills in Biella & Marche</p>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <div>
            © {new Date().getFullYear()} Virga Inc. All rights reserved. Considered Fashion & Living.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacy-notice" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/help" className="hover:text-foreground transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
