import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, CreditCard, Heart, Star, TrendingUp } from "lucide-react"

const recentOrders = [
  {
    id: "ORD-2025-001234",
    date: "2025-01-20",
    status: "Processing",
    total: 726.12,
    items: 3,
  },
  {
    id: "ORD-2025-001233",
    date: "2025-01-15",
    status: "Delivered",
    total: 299.0,
    items: 1,
  },
  {
    id: "ORD-2025-001232",
    date: "2025-01-10",
    status: "Delivered",
    total: 189.0,
    items: 1,
  },
]

const accountStats = [
  { label: "Total Orders", value: "12", icon: Package },
  { label: "Wishlist Items", value: "8", icon: Heart },
  { label: "Reviews Written", value: "5", icon: Star },
  { label: "Loyalty Points", value: "2,450", icon: TrendingUp },
]

export default function AccountOverviewPage() {
  const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "Overview", href: "/account" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight">Account Overview</h1>
              <p className="text-muted-foreground">Welcome back, Sarah!</p>
            </div>
            <AccountSidebar />
          </div>

          <div className="flex gap-8">
            <AccountSidebar />

            <div className="flex-1 space-y-8">
              {/* Account Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {accountStats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <stat.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-2xl font-semibold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Orders
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-muted rounded-lg">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()} • {order.items} items
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "secondary"
                                : order.status === "Processing"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                          <div className="text-right">
                            <div className="font-semibold">${order.total.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Manage Addresses</h3>
                    <p className="text-sm text-muted-foreground mb-4">Update your shipping and billing addresses</p>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground mb-4">Add or update your payment information</p>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Wishlist</h3>
                    <p className="text-sm text-muted-foreground mb-4">View and manage your saved items</p>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
