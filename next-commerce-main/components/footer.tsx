import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerSections = [
  {
    title: "Shop",
    links: [
      { name: "Women", href: "/category/women" },
      { name: "Men", href: "/category/men" },
      { name: "Kids", href: "/category/kids" },
      { name: "Home", href: "/category/home" },
      { name: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Stay in the loop</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
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

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Modo. All rights reserved.</div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-sm text-muted-foreground">We accept:</div>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-xs font-mono">
                VISA
              </div>
              <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-xs font-mono">
                MC
              </div>
              <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-xs font-mono">
                AMEX
              </div>
              <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-xs font-mono">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
