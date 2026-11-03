import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Package } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MeOrdersPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login?callbackUrl=/me/orders")
  }

  await dbConnect()

  const orders = await Order.find({
    $or: [{ client: session.user.id }, { email: session.user.email }],
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
        <div className="p-8 rounded-3xl bg-card border border-border/80 text-center text-xs text-muted-foreground space-y-2">
          <Package className="h-6 w-6 mx-auto opacity-50" />
          <p>No orders on record.</p>
          <Link href="/shop" className="text-primary hover:underline block font-medium">
            Discover our collection
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord: any) => (
            <div key={ord._id.toString()} className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/track/${ord.orderNo}`}
                    className="font-mono text-sm font-bold hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span>{ord.orderNo}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    Placed {new Date(ord.addedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="rounded-full text-xs capitalize">
                    {ord.state}
                  </Badge>
                  <span className="font-bold text-sm">{formatPrice(ord.totals?.total ?? 0)}</span>
                  <Link
                    href={`/track/${ord.orderNo}`}
                    className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Track
                  </Link>
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
