import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function MeOrdersPage() {
  const session = await auth()
  await dbConnect()

  const orders = await Order.find({
    $or: [{ client: session?.user?.id }, { email: session?.user?.email }],
  })
    .sort({ addedAt: -1 })
    .lean()

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-border/60">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Order History
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review details and fulfillment status of all your orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 rounded-3xl bg-card border border-border/80 text-center text-xs text-muted-foreground">
          No orders on record.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord: any) => (
            <div key={ord._id.toString()} className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div>
                  <span className="font-mono text-sm font-bold">{ord.orderNo}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Placed {new Date(ord.addedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="rounded-full text-xs capitalize">
                    {ord.state}
                  </Badge>
                  <span className="font-bold text-sm">{formatPrice(ord.totals.total)}</span>
                </div>
              </div>

              <div className="divide-y divide-border/60">
                {ord.lines.map((l: any, idx: number) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-xs">
                    <span>{l.titleSnapshot} (×{l.qty})</span>
                    <span className="font-semibold">{formatPrice(l.unitPrice * l.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
