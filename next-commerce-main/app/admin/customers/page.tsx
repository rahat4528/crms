import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomerTable } from "@/components/admin/customer-table"
import { Search, Filter, Download, UserPlus, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Customers", value: "1,234", change: "+12%" },
  { title: "New This Month", value: "89", change: "+23%" },
  { title: "VIP Customers", value: "156", change: "+8%" },
  { title: "Active Customers", value: "1,089", change: "+15%" },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database and relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Newsletter
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
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
          <Input placeholder="Search customers..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <CustomerTable />
    </div>
  )
}
