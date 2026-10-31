"use client"

import Link from "next/link"
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
      { name: "Reach Us", href: "/reach-us" },
      { name: "Help & FAQ", href: "/help" },
      { name: "Fit & Size Guide", href: "/fit-guide" },
      { name: "Client Account", href: "/me" },
    ],
  },
  {
    title: "Editorial",
    links: [
      { name: "Our Story", href: "/story" },
      { name: "Journal", href: "/journal" },
      { name: "Lookbook", href: "/lookbook" },
      { name: "Studio Portal", href: "/studio" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Notice", href: "/privacy-notice" },
      { name: "Terms of Use", href: "/terms-of-use" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card mt-auto">
      <div className="container-virga py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Virga
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Considered fashion and living essentials crafted with purpose, tactile materials, and enduring design.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                Receive the Virga Dispatches
              </h4>
              <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-full bg-background border-border text-sm"
                />
                <Button type="submit" className="rounded-full px-5 text-sm">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <div>© {new Date().getFullYear()} Virga. All rights reserved. Considered Fashion & Living.</div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-notice" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms-of-use" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/studio" className="hover:text-primary font-medium">
              Studio Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

