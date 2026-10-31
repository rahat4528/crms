import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import OrdersGrid, { type OrderRowData } from "@/components/studio/orders-grid"

export const dynamic = "force-dynamic"

export default async function StudioOrdersPage() {
  await dbConnect()

  const ordersDocs = await Order.find().sort({ addedAt: -1 }).lean()
  const orders = JSON.parse(JSON.stringify(ordersDocs)) as OrderRowData[]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Orders & Fulfillment
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor incoming customer checkouts, packaging states, and courier tracking.
        </p>
      </div>

      <OrdersGrid orders={orders} />
    </div>
  )
}

