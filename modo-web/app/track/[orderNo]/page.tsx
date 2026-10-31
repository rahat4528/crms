import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle2 } from "lucide-react"

interface TrackPageProps {
  params: Promise<{ orderNo: string }>
}

export const dynamic = "force-dynamic"

export default async function TrackOrderPage({ params }: TrackPageProps) {
  const { orderNo } = await params
  await dbConnect()

  const order = await Order.findOne({ orderNo }).lean()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-12 space-y-8 max-w-2xl">
        <TrailNav items={[{ label: "Track Shipment" }]} />

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Fulfillment Tracking
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Order #{orderNo}
          </h1>
        </div>

        {!order ? (
          <div className="p-8 rounded-3xl bg-card border border-border/80 text-center space-y-2">
            <p className="text-sm font-medium text-foreground">Order not found</p>
            <p className="text-xs text-muted-foreground">
              Please verify your reference number or check your confirmation email.
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <div>
                <span className="text-xs text-muted-foreground">Current State</span>
                <p className="text-lg font-bold font-heading text-foreground capitalize">
                  {order.state}
                </p>
              </div>
              <Badge variant="outline" className="rounded-full text-xs capitalize">
                {order.payment?.status === "succeeded" ? "Paid" : "Pending Payment"}
              </Badge>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Shipment History
              </h3>
              <div className="space-y-3">
                {order.timeline?.map((t: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">{t.state}</p>
                      {t.note && <p className="text-muted-foreground">{t.note}</p>}
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {new Date(t.at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="pt-4 border-t border-border/60 space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pieces in Delivery
              </h4>
              <div className="divide-y divide-border/60">
                {order.lines.map((l: any, idx: number) => (
                  <div key={idx} className="py-2 flex justify-between text-xs">
                    <span>{l.titleSnapshot} (×{l.qty})</span>
                    <span className="font-semibold">{formatPrice(l.unitPrice * l.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

