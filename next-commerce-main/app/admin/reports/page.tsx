import { SalesChart } from "@/components/admin/sales-chart"
import { ReportFilters } from "@/components/admin/report-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive insights into your business performance</p>
      </div>

      <ReportFilters />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$328,000</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,902</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">546</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15.3%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.24%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.4%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SalesChart
              type="area"
              dataKey="sales"
              title="Revenue Trend"
              description="Monthly revenue over the last 6 months"
            />
            <SalesChart type="bar" dataKey="orders" title="Order Volume" description="Number of orders per month" />
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SalesChart
              type="line"
              dataKey="sales"
              title="Sales Performance"
              description="Detailed sales analysis over time"
            />
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Silk Midi Dress", sales: "$12,450", units: 89 },
                    { name: "Cashmere Sweater", sales: "$8,920", units: 67 },
                    { name: "Leather Handbag", sales: "$7,650", units: 45 },
                    { name: "Wool Coat", sales: "$6,780", units: 34 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.units} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.sales}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Analysis of product sales and inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Products</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Products</span>
                    <span className="font-medium">1,189</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Out of Stock</span>
                    <span className="font-medium text-red-600">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Low Stock</span>
                    <span className="font-medium text-yellow-600">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Dresses", percentage: 35, sales: "$114,500" },
                    { category: "Tops", percentage: 28, sales: "$91,840" },
                    { category: "Accessories", percentage: 20, sales: "$65,600" },
                    { category: "Outerwear", percentage: 17, sales: "$55,760" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.sales}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SalesChart
              type="area"
              dataKey="customers"
              title="Customer Acquisition"
              description="New customers acquired over time"
            />
            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Key customer metrics and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Customers</span>
                    <span className="font-medium">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Customers</span>
                    <span className="font-medium">8,923</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Order Value</span>
                    <span className="font-medium">$172.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer Lifetime Value</span>
                    <span className="font-medium">$1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Repeat Purchase Rate</span>
                    <span className="font-medium">34.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
