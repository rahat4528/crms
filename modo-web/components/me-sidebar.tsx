"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, Settings, MapPin, Heart, Gift, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const meLinks = [
  { name: "Overview", href: "/me", icon: User },
  { name: "Orders", href: "/me/orders", icon: Package },
  { name: "Addresses", href: "/me/addresses", icon: MapPin },
  { name: "Wishlist", href: "/me/wishlist", icon: Heart },
  { name: "Rewards", href: "/me/rewards", icon: Gift },
  { name: "Settings", href: "/me/settings", icon: Settings },
]

export function MeSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full md:w-64 space-y-6">
      <div className="p-5 rounded-3xl bg-card border border-border/80 space-y-1">
        <h2 className="font-heading text-lg font-bold text-foreground px-3 mb-3">
          My Account
        </h2>
        <nav className="space-y-1">
          {meLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{link.name}</span>
              </Link>
            )
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}

export default MeSidebar

