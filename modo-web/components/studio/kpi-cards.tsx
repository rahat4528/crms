import { ArrowUpRight, DollarSign, Package, Users, Shirt } from "lucide-react"
import { formatPrice } from "@/lib/cn"

interface KpiData {
  revenue: number
  ordersCount: number
  clientsCount: number
  itemsCount: number
}

interface KpiCardsProps {
  stats: KpiData
}

export function KpiCards({ stats }: KpiCardsProps) {
  const cards = [
    {
      label: "Total Net Revenue",
      value: formatPrice(stats.revenue || 0),
      change: "+14.2% vs last month",
      icon: DollarSign,
    },
    {
      label: "Orders Fulfilled",
      value: (stats.ordersCount || 0).toLocaleString(),
      change: "+8.4% vs last month",
      icon: Package,
    },
    {
      label: "Registered Clients",
      value: (stats.clientsCount || 0).toLocaleString(),
      change: "+19.1% growth",
      icon: Users,
    },
    {
      label: "Live Catalog Pieces",
      value: (stats.itemsCount || 0).toLocaleString(),
      change: "Active in catalog",
      icon: Shirt,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.label}
            className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">{c.label}</span>
              <div className="h-8 w-8 rounded-xl bg-muted/80 flex items-center justify-center text-foreground">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground block">
                {c.value}
              </span>
              <span className="inline-flex items-center text-xs text-secondary font-medium mt-1">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                {c.change}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KpiCards

