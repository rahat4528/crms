import { notFound } from "next/navigation"
import dbConnect from "@/lib/db"
import Order from "@/models/Order"
import OrderView from "@/components/studio/order-view"

interface StudioOrderPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function StudioSingleOrderPage({ params }: StudioOrderPageProps) {
  const { id } = await params
  await dbConnect()

  const orderDoc = await Order.findById(id).lean()
  if (!orderDoc) {
    notFound()
  }

  const order = JSON.parse(JSON.stringify(orderDoc))
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <OrderView order={order} />
    </div>
  )
}

