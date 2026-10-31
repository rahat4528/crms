import { notFound } from "next/navigation"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Order from "@/models/Order"
import ClientProfile from "@/components/studio/client-profile"

interface StudioClientPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function StudioSingleClientPage({ params }: StudioClientPageProps) {
  const { id } = await params
  await dbConnect()

  const clientDoc = await User.findById(id).lean()
  if (!clientDoc) {
    notFound()
  }

  const orderDocs = await Order.find({ client: id }).sort({ addedAt: -1 }).lean()

  const client = JSON.parse(JSON.stringify(clientDoc))
  const orders = JSON.parse(JSON.stringify(orderDocs))

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ClientProfile client={client} orders={orders} />
    </div>
  )
}

