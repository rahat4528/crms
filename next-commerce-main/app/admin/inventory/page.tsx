import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Package, TrendingDown, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inventoryItems = [
  { id: "1", name: "Silk Midi Dress", sku: "SMD-001", stock: 45, reserved: 5, available: 40, status: "In Stock" },
  { id: "2", name: "Cashmere Sweater", sku: "CS-002", stock: 23, reserved: 3, available: 20, status: "In Stock" },
  { id: "3", name: "Leather Handbag", sku: "LH-003", stock: 8, reserved: 2, available: 6, status: "Low Stock" },
  { id: "4", name: "Designer Sunglasses", sku: "DS-004", stock: 0, reserved: 0, available: 0, status: "Out of Stock" },
  { id: "5", name: "Premium Sneakers", sku: "PS-005", stock: 67, reserved: 7, available: 60, status: "In Stock" },
]

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    icon: Package,
    change: "+12%",
    trend: "up",
  },
  {
    title: "Low Stock Items",
    value: "23",
    icon: AlertTriangle,
    change: "+5%",
    trend: "up",
  },
  {
    title: "Out of Stock",
    value: "8",
    icon: TrendingDown,
    change: "-2%",
    trend: "down",
  },
  {
    title: "Total Value",
    value: "$45,231",
    icon: TrendingUp,
    change: "+18%",
    trend: "up",
  },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track stock levels and manage inventory across all products</p>
      </div>

      {/* Inventory Stats */}
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
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-10" />
        </div>
        <Button variant="outline">Export Inventory</Button>
        <Button variant="outline">Bulk Update</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.reserved}</TableCell>
                  <TableCell>{item.available}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "In Stock"
                          ? "default"
                          : item.status === "Low Stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
