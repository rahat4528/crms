import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import Link from "next/link"
import { Package, ArrowRight, Heart } from "lucide-react"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function MeOverviewPage() {
  const session = await auth()
  await dbConnect()

  const recentOrders = await Order.find({
    $or: [{ client: session?.user?.id }, { email: session?.user?.email }],
  })
    .sort({ addedAt: -1 })
    .limit(3)
    .lean()

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Welcome
        </span>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Hello, {session?.user?.name || "Valued Client"}
        </h1>
        <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
      </div>

      {/* Recent Orders */}
      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-heading text-base font-bold text-foreground">Recent Orders</h2>
          <Link href="/me/orders" className="text-xs text-primary hover:underline font-medium">
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground space-y-2">
            <Package className="h-6 w-6 mx-auto opacity-50" />
            <p>You have not placed any orders yet.</p>
            <Link href="/shop" className="text-primary hover:underline block font-medium">
              Start exploring the collection
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {recentOrders.map((ord: any) => (
              <div key={ord._id.toString()} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <span className="font-mono text-xs font-semibold">{ord.orderNo}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {new Date(ord.addedAt).toLocaleDateString()}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ord.lines?.length || 1} items · {formatPrice(ord.totals?.total || 0)}
                  </p>
                </div>
                <Badge variant="outline" className="rounded-full text-[10px] capitalize">
                  {ord.state}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
