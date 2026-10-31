"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Megaphone,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  List,
  Tags,
  Warehouse,
  CreditCard,
  Truck,
  UserCheck,
  Mail,
  Star,
  ImageIcon,
  PenTool,
  TrendingUp,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Product Management",
    icon: Package,
    children: [
      { href: "/admin/products", label: "All Products", icon: List },
      { href: "/admin/products/add", label: "Add Product", icon: Plus },
      { href: "/admin/categories", label: "Categories", icon: Tags },
      { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
    ],
  },
  {
    label: "Order Management",
    icon: ShoppingCart,
    children: [
      { href: "/admin/orders", label: "All Orders", icon: List },
      { href: "/admin/orders/pending", label: "Pending Orders", icon: ShoppingCart },
      { href: "/admin/returns", label: "Returns & Refunds", icon: CreditCard },
    ],
  },
  {
    label: "Customer Management",
    icon: Users,
    children: [
      { href: "/admin/customers", label: "All Customers", icon: Users },
      { href: "/admin/customers/groups", label: "Customer Groups", icon: UserCheck },
    ],
  },
  {
    label: "Marketing & Promotions",
    icon: Megaphone,
    children: [
      { href: "/admin/promotions", label: "Promotions", icon: Megaphone },
      { href: "/admin/coupons", label: "Coupon Codes", icon: Tags },
      { href: "/admin/reviews", label: "Customer Reviews", icon: Star },
      { href: "/admin/email-marketing", label: "Email Marketing", icon: Mail },
    ],
  },
  {
    label: "Content Management",
    icon: FileText,
    children: [
      { href: "/admin/content/page-sections", label: "Page Sections", icon: FileText },
      { href: "/admin/content/page-sections/new", label: "Create Page Section", icon: Plus },
      { href: "/admin/content/banners", label: "Homepage Banners", icon: ImageIcon },
      { href: "/admin/content/blog", label: "Blog Management", icon: PenTool },
    ],
  },
  {
    label: "Reports & Analytics",
    icon: BarChart3,
    children: [
      { href: "/admin/reports/sales", label: "Sales Reports", icon: TrendingUp },
      { href: "/admin/reports/customers", label: "Customer Reports", icon: Users },
      { href: "/admin/reports/products", label: "Product Reports", icon: Package },
      { href: "/admin/reports/marketing", label: "Marketing Reports", icon: Megaphone },
    ],
  },
  {
    label: "Settings & Configuration",
    icon: Settings,
    children: [
      { href: "/admin/settings/payment", label: "Payment Gateways", icon: CreditCard },
      { href: "/admin/settings/shipping", label: "Shipping & Tax", icon: Truck },
      { href: "/admin/settings/general", label: "General Settings", icon: Settings },
      { href: "/admin/settings/users", label: "User Roles", icon: Shield },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (label: string) => {
    setOpenSections((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const isActive = (href: string) => pathname === href
  const isSectionActive = (children: any[]) => children.some((child) => pathname === child.href)

  return (
    <div className="w-64 bg-card border-r h-full overflow-y-auto">
      <div className="p-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="text-2xl font-bold tracking-tight">Admin</div>
        </Link>
      </div>

      <nav className="px-4 pb-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            if (item.children) {
              const sectionActive = isSectionActive(item.children)
              const isOpen = openSections.includes(item.label) || sectionActive

              return (
                <Collapsible key={item.label} open={isOpen} onOpenChange={() => toggleSection(item.label)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-left font-normal",
                        sectionActive && "bg-accent text-accent-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 ml-6 rounded-md text-sm transition-colors",
                          isActive(child.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        {child.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
