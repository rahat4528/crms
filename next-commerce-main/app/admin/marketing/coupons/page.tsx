import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CouponTable } from "@/components/admin/coupon-table"
import { Search, Filter, Download, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const couponStats = [
  { title: "Active Coupons", value: "23", change: "+5%" },
  { title: "Total Redemptions", value: "1,234", change: "+18%" },
  { title: "Revenue from Coupons", value: "$12,450", change: "+12%" },
  { title: "Average Discount", value: "15.2%", change: "-2%" },
]

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons & Discounts</h1>
          <p className="text-muted-foreground">Create and manage discount codes and promotions</p>
        </div>
        <Button asChild>
          <Link href="/admin/marketing/coupons/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Link>
        </Button>
      </div>

      {/* Coupon Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {couponStats.map((stat) => (
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
          <Input placeholder="Search coupons..." className="pl-10" />
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

      <CouponTable />
    </div>
  )
}
