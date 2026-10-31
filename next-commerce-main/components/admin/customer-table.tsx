"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Mail, Ban, UserCheck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const customers = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    orders: 12,
    totalSpent: "$2,450.00",
    lastOrder: "2024-01-15",
    status: "Active",
    group: "VIP",
    joinDate: "2023-03-15",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    orders: 8,
    totalSpent: "$1,230.00",
    lastOrder: "2024-01-14",
    status: "Active",
    group: "Regular",
    joinDate: "2023-06-20",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    orders: 15,
    totalSpent: "$3,890.00",
    lastOrder: "2024-01-13",
    status: "Active",
    group: "VIP",
    joinDate: "2023-01-10",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william@example.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    orders: 3,
    totalSpent: "$450.00",
    lastOrder: "2024-01-12",
    status: "Active",
    group: "Regular",
    joinDate: "2023-11-05",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia@example.com",
    phone: "+1 (555) 567-8901",
    location: "Miami, FL",
    orders: 0,
    totalSpent: "$0.00",
    lastOrder: "Never",
    status: "Inactive",
    group: "Regular",
    joinDate: "2024-01-01",
  },
]

export function CustomerTable() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map((c) => c.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedCustomers.length === customers.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/admin/customers/${customer.id}`} className="font-medium hover:underline">
                        {customer.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">Joined {customer.joinDate}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{customer.location}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={customer.group === "VIP" ? "default" : "outline"}>{customer.group}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Customer
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Change Group
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
