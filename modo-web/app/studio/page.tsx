import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import Item from "@/models/Item"
import User from "@/models/User"
import KpiCards from "@/components/studio/kpi-cards"
import RevenueChart from "@/components/studio/revenue-chart"
import OrdersGrid, { type OrderRowData } from "@/components/studio/orders-grid"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function StudioDashboardPage() {
  await dbConnect()

  const [ordersDocs, itemsCount, clientsCount] = await Promise.all([
    Order.find().sort({ addedAt: -1 }).limit(10).lean(),
    Item.countDocuments({ state: "live" }),
    User.countDocuments({ role: "client" }),
  ])

  const totalRevenue = ordersDocs.reduce((acc, ord) => acc + (ord.totals?.total || 0), 0)
  const orders = JSON.parse(JSON.stringify(ordersDocs)) as OrderRowData[]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Studio Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time catalog performance, order fulfillment, and client activity.
          </p>
        </div>

        <Button asChild size="sm" className="rounded-full shadow-sm text-xs">
          <Link href="/studio/quick-add">
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            Quick Add Piece
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <KpiCards
        stats={{
          revenue: totalRevenue,
          ordersCount: ordersDocs.length,
          clientsCount,
          itemsCount,
        }}
      />

      {/* Charts */}
      <RevenueChart />

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Recent Client Orders
          </h3>
          <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
            <Link href="/studio/orders">
              All Orders
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
        <OrdersGrid orders={orders} />
      </div>
    </div>
  )
}

