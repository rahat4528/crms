import dbConnect from "@/lib/db"
import User from "@/models/User"
import ClientsGrid, { type ClientRowData } from "@/components/studio/clients-grid"

export const dynamic = "force-dynamic"

export default async function StudioClientsPage() {
  await dbConnect()

  const clientsDocs = await User.find().sort({ createdAt: -1 }).lean()
  const clients = JSON.parse(JSON.stringify(clientsDocs)) as ClientRowData[]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Client Directory
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review registered customer accounts, roles, addresses, and purchase histories.
        </p>
      </div>

      <ClientsGrid clients={clients} />
    </div>
  )
}

