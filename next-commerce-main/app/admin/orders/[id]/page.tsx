import { OrderDetails } from "@/components/admin/order-details"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderDetails orderId={params.id} />
}
