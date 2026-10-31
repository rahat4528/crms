"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, ShoppingBag, DollarSign, Star, Edit, Ban } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CustomerDetailsProps {
  customerId: string
}

const customerData = {
  id: "1",
  name: "Olivia Martin",
  email: "olivia@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "March 15, 2023",
  status: "Active",
  group: "VIP",
  totalOrders: 12,
  totalSpent: 2450.0,
  averageOrderValue: 204.17,
  lastOrderDate: "January 15, 2024",
  addresses: [
    {
      id: "1",
      type: "Shipping",
      name: "Olivia Martin",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      type: "Billing",
      name: "Olivia Martin",
      street: "456 Business St",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "United States",
      isDefault: false,
    },
  ],
  recentOrders: [
    {
      id: "#3210",
      date: "2024-01-15",
      status: "Shipped",
      total: "$299.99",
      items: 2,
    },
    {
      id: "#3198",
      date: "2024-01-10",
      status: "Delivered",
      total: "$199.99",
      items: 1,
    },
    {
      id: "#3187",
      date: "2024-01-05",
      status: "Delivered",
      total: "$449.99",
      items: 3,
    },
  ],
  notes: [
    {
      id: "1",
      date: "2024-01-15",
      author: "Admin",
      content: "Customer requested expedited shipping for order #3210",
    },
    {
      id: "2",
      date: "2024-01-10",
      author: "Support",
      content: "Resolved sizing question via email",
    },
  ],
}

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
            <AvatarFallback className="text-lg">{getInitials(customerData.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{customerData.name}</h1>
            <p className="text-muted-foreground">Customer since {customerData.joinDate}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={customerData.status === "Active" ? "default" : "secondary"}>{customerData.status}</Badge>
              <Badge variant={customerData.group === "VIP" ? "default" : "outline"}>{customerData.group}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Customer
          </Button>
          <Button variant="outline">
            <Ban className="mr-2 h-4 w-4" />
            Suspend
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customerData.totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${customerData.totalSpent.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${customerData.averageOrderValue.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Order</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{customerData.lastOrderDate}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerData.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="font-medium">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Customer Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.notes.map((note) => (
                  <div key={note.id} className="border-l-2 border-muted pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{note.author}</span>
                      <span className="text-sm text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{customerData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{customerData.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerData.addresses.map((address) => (
                <div key={address.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{address.type} Address</span>
                    {address.isDefault && <Badge variant="outline">Default</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{address.name}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p>{address.country}</p>
                  </div>
                  {address !== customerData.addresses[customerData.addresses.length - 1] && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
