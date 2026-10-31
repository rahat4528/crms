import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Edit, Copy, Pause, Trash2, BarChart3, Calendar, DollarSign } from "lucide-react"

interface CouponPageProps {
  params: {
    id: string
  }
}

const couponData = {
  id: "1",
  code: "WELCOME20",
  name: "Welcome Discount",
  description: "20% discount for new customers on their first purchase",
  type: "Percentage",
  value: 20,
  minOrderAmount: 50,
  maxDiscount: 100,
  usageLimit: 100,
  usageCount: 45,
  status: "Active",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  createdDate: "2023-12-15",
  applicableProducts: "All Products",
  customerGroups: ["New Customers", "Regular Customers"],
  recentUsage: [
    { customer: "John Doe", order: "#3210", date: "2024-01-15", discount: "$15.99" },
    { customer: "Jane Smith", order: "#3209", date: "2024-01-14", discount: "$12.50" },
    { customer: "Bob Johnson", order: "#3208", date: "2024-01-13", discount: "$20.00" },
  ],
}

export default function CouponPage({ params }: CouponPageProps) {
  return (
    <div className="space-y-6">
      {/* Coupon Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{couponData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{couponData.code}</code>
            <Badge variant={couponData.status === "Active" ? "default" : "secondary"}>{couponData.status}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy Code
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Coupon
          </Button>
          <Button variant="outline">
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
          <Button variant="outline" className="text-destructive bg-transparent">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Coupon Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Discount Type</label>
                  <p className="text-sm text-muted-foreground">{couponData.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Discount Value</label>
                  <p className="text-sm text-muted-foreground">{couponData.value}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Minimum Order</label>
                  <p className="text-sm text-muted-foreground">${couponData.minOrderAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Discount</label>
                  <p className="text-sm text-muted-foreground">${couponData.maxDiscount}</p>
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{couponData.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Applicable Products</label>
                <p className="text-sm text-muted-foreground">{couponData.applicableProducts}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Customer Groups</label>
                <div className="flex gap-1 mt-1">
                  {couponData.customerGroups.map((group) => (
                    <Badge key={group} variant="outline">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {couponData.recentUsage.map((usage, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{usage.customer}</p>
                      <p className="text-sm text-muted-foreground">Order {usage.order}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{usage.discount}</p>
                      <p className="text-sm text-muted-foreground">{usage.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coupon Stats */}
        <div className="space-y-6">
          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{couponData.usageCount}</div>
                <div className="text-sm text-muted-foreground">of {couponData.usageLimit} uses</div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(couponData.usageCount / couponData.usageLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <p className="text-sm text-muted-foreground">{couponData.startDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <p className="text-sm text-muted-foreground">{couponData.endDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Created</label>
                <p className="text-sm text-muted-foreground">{couponData.createdDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">$1,234</div>
                <div className="text-sm text-muted-foreground">Total Discount Given</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$8,765</div>
                <div className="text-sm text-muted-foreground">Revenue Generated</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
