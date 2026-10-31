import InsightFilters from "@/components/studio/insight-filters"
import RevenueChart from "@/components/studio/revenue-chart"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import Item from "@/models/Item"
import { formatPrice } from "@/lib/cn"

export const dynamic = "force-dynamic"

export default async function StudioInsightsPage() {
  await dbConnect()

  const [orders, items] = await Promise.all([
    Order.find().lean(),
    Item.find().lean(),
  ])

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0)
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Studio Insights & Analytics
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Detailed metrics covering sales velocity, average order values, and client cohort retention.
        </p>
      </div>

      <InsightFilters />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground uppercase font-semibold">Total Net Sales</span>
          <p className="font-heading text-2xl font-bold text-foreground">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground uppercase font-semibold">Average Order Value</span>
          <p className="font-heading text-2xl font-bold text-foreground">{formatPrice(avgOrderValue)}</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground uppercase font-semibold">Total Lifetime Orders</span>
          <p className="font-heading text-2xl font-bold text-foreground">{orders.length} orders</p>
        </div>
      </div>

      <RevenueChart />
    </div>
  )
}

