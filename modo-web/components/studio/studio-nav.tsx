"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Shirt,
  FolderTree,
  ShoppingBag,
  Users,
  Boxes,
  Megaphone,
  Palette,
  BarChart3,
  RotateCcw,
  Sliders,
  PlusCircle,
  FileSpreadsheet,
  Globe,
  Store,
} from "lucide-react"

const primaryNav = [
  { name: "Overview", href: "/studio", icon: LayoutDashboard },
  { name: "Catalog", href: "/studio/catalog", icon: Shirt },
  { name: "Collections", href: "/studio/collections", icon: FolderTree },
  { name: "Orders", href: "/studio/orders", icon: ShoppingBag },
  { name: "Clients", href: "/studio/clients", icon: Users },
  { name: "Stock & Inventory", href: "/studio/stock", icon: Boxes },
  { name: "Campaigns & Promos", href: "/studio/campaigns", icon: Megaphone },
  { name: "Content & Blocks", href: "/studio/content", icon: Palette },
  { name: "Insights & Reports", href: "/studio/insights", icon: BarChart3 },
  { name: "Exchanges & Returns", href: "/studio/exchanges", icon: RotateCcw },
  { name: "Studio Settings", href: "/studio/settings", icon: Sliders },
]

const toolsNav = [
  { name: "Quick Add Piece", href: "/studio/quick-add", icon: PlusCircle },
  { name: "Bulk CSV Import", href: "/studio/bulk-import", icon: FileSpreadsheet },
  { name: "Page Builder", href: "/studio/page-builder", icon: Globe },
]

export function StudioNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border/80 bg-sidebar text-sidebar-foreground min-h-screen flex flex-col p-4 flex-shrink-0">
      {/* Studio Header */}
      <div className="flex items-center space-x-2.5 px-3 py-4 border-b border-sidebar-border mb-4">
        <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold font-heading text-sm shadow-sm">
          V
        </div>
        <div>
          <span className="font-heading font-bold text-base block text-sidebar-foreground">
            Virga Studio
          </span>
          <span className="text-[11px] text-muted-foreground block -mt-0.5">
            Admin Workspace
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        <div>
          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Operations
          </span>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
            Superpowers
          </span>
          <nav className="space-y-1">
            {toolsNav.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Storefront return link */}
      <div className="pt-4 border-t border-sidebar-border mt-auto">
        <Link
          href="/"
          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Store className="h-4 w-4" />
          <span>View Customer Storefront</span>
        </Link>
      </div>
    </aside>
  )
}

export default StudioNav

