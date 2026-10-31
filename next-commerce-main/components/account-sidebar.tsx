"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, Package, MapPin, CreditCard, Heart, Star, Settings, LogOut, Menu } from "lucide-react"

const navigationItems = [
  { href: "/account", label: "Overview", icon: User },
  { href: "/account/orders", label: "Order History", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/payment", label: "Payment Methods", icon: CreditCard },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/reviews", label: "My Reviews", icon: Star },
  { href: "/account/settings", label: "Account Settings", icon: Settings },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavigationContent = () => (
    <div className="space-y-2">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
      <div className="pt-4 mt-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 p-6 bg-card rounded-lg border">
          <h2 className="font-semibold mb-6">My Account</h2>
          <NavigationContent />
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4 mr-2" />
              Account Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="py-6">
              <h2 className="font-semibold mb-6">My Account</h2>
              <NavigationContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
