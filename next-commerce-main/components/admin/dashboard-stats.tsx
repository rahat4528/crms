"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const stats = [
  {
    title: "Total Sales",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
    description: "from last month",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Products Sold",
    value: "5,678",
    change: "-4.3%",
    trend: "down",
    icon: Package,
    description: "from last month",
  },
]

const recentOrders = [
  { id: "#3210", customer: "Olivia Martin", amount: "$1,999.00", status: "Shipped" },
  { id: "#3209", customer: "Jackson Lee", amount: "$39.00", status: "Processing" },
  { id: "#3208", customer: "Isabella Nguyen", amount: "$299.00", status: "Delivered" },
  { id: "#3207", customer: "William Kim", amount: "$99.00", status: "Pending" },
  { id: "#3206", customer: "Sofia Davis", amount: "$39.00", status: "Cancelled" },
]

const topProducts = [
  { name: "Silk Midi Dress", sales: 1234, revenue: "$24,680" },
  { name: "Cashmere Sweater", sales: 987, revenue: "$19,740" },
  { name: "Leather Handbag", sales: 756, revenue: "$15,120" },
  { name: "Designer Sunglasses", sales: 543, revenue: "$10,860" },
  { name: "Premium Sneakers", sales: 432, revenue: "$8,640" },
]

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{order.amount}</div>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Shipped"
                            ? "secondary"
                            : order.status === "Processing"
                              ? "outline"
                              : order.status === "Cancelled"
                                ? "destructive"
                                : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                  </div>
                  <div className="text-sm font-medium">{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
