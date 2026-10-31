import { formatPrice } from "@/lib/cn"
import { Badge } from "@/components/ui/badge"

interface ClientProfileProps {
  client: {
    _id: string
    name: string
    email: string
    role: string
    phone?: string
    addresses?: Array<{
      label?: string
      street: string
      city: string
      postalCode: string
      country: string
    }>
    createdAt: string
  }
  orders?: Array<{
    _id: string
    orderNo: string
    totals: { total: number }
    state: string
    addedAt: string
  }>
}

export function ClientProfile({ client, orders = [] }: ClientProfileProps) {
  const lifetimeValue = orders.reduce((sum, ord) => sum + (ord.totals?.total || 0), 0)

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="font-heading text-2xl font-bold text-foreground">{client.name}</h2>
            <Badge variant="outline" className="rounded-full text-xs capitalize">
              {client.role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{client.email}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/60 text-right">
          <span className="text-xs uppercase tracking-wider text-muted-foreground block">
            Lifetime Spend
          </span>
          <span className="font-heading text-xl font-bold text-foreground">
            {formatPrice(lifetimeValue)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-3">
          <h3 className="font-heading text-base font-bold text-foreground">Client Addresses</h3>
          {client.addresses && client.addresses.length > 0 ? (
            client.addresses.map((addr, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/40 text-xs space-y-0.5">
                <span className="font-semibold block">{addr.label || "Address"}</span>
                <p className="text-muted-foreground">{addr.street}</p>
                <p className="text-muted-foreground">
                  {addr.city}, {addr.postalCode} {addr.country}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">No addresses saved yet.</p>
          )}
        </div>

        <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-3">
          <h3 className="font-heading text-base font-bold text-foreground">Purchase History</h3>
          <div className="divide-y divide-border/60">
            {orders.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-4">No orders placed yet.</p>
            ) : (
              orders.map((ord) => (
                <div key={ord._id} className="py-2.5 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-mono text-xs font-semibold">{ord.orderNo}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(ord.addedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="rounded-full text-[10px] capitalize">
                      {ord.state}
                    </Badge>
                    <span className="font-semibold text-xs">{formatPrice(ord.totals.total)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile

