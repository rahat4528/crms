import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderTable } from "@/components/admin/order-table"
import { Search, Filter, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Orders", value: "2,350", change: "+12%" },
  { title: "Pending Orders", value: "45", change: "+5%" },
  { title: "Shipped Today", value: "23", change: "+18%" },
  { title: "Returns", value: "8", change: "-2%" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <OrderTable />
    </div>
  )
}
