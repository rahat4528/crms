import { CustomerDetails } from "@/components/admin/customer-details"

interface CustomerPageProps {
  params: {
    id: string
  }
}

export default function CustomerPage({ params }: CustomerPageProps) {
  return <CustomerDetails customerId={params.id} />
}
