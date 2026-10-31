import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { Button } from "@/components/ui/button"
import { MapPin, Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MeAddressesPage() {
  const session = await auth()
  await dbConnect()

  const user = await User.findById(session?.user?.id).lean()
  const addresses = user?.addresses || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-border/60">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Address Book
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your saved delivery destinations.
          </p>
        </div>
        <Button size="sm" variant="outline" className="rounded-full text-xs">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="p-8 rounded-3xl bg-card border border-border/80 col-span-2 text-center text-xs text-muted-foreground">
            No saved addresses. Your delivery addresses from checkout will be saved here.
          </div>
        ) : (
          addresses.map((addr, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{addr.label || "Address"}</span>
              </div>
              <p className="text-xs text-muted-foreground">{addr.street}</p>
              <p className="text-xs text-muted-foreground">
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p className="text-xs text-muted-foreground">{addr.country}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

