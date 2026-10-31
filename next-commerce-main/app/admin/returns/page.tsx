import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, MoreHorizontal, Eye, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const returns = [
  {
    id: "RMA-001",
    orderId: "#3210",
    customer: "Olivia Martin",
    product: "Silk Midi Dress",
    reason: "Size too small",
    status: "Pending",
    date: "2024-01-20",
    refundAmount: "$299.99",
  },
  {
    id: "RMA-002",
    orderId: "#3205",
    customer: "Jackson Lee",
    product: "Cashmere Sweater",
    reason: "Defective item",
    status: "Approved",
    date: "2024-01-18",
    refundAmount: "$199.99",
  },
  {
    id: "RMA-003",
    orderId: "#3198",
    customer: "Isabella Nguyen",
    product: "Leather Handbag",
    reason: "Changed mind",
    status: "Rejected",
    date: "2024-01-15",
    refundAmount: "$449.99",
  },
]

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Returns & Refunds</h1>
          <p className="text-muted-foreground">Manage return requests and process refunds</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search returns..." className="pl-10" />
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

      <Card>
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RMA ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Refund Amount</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((returnItem) => (
                <TableRow key={returnItem.id}>
                  <TableCell className="font-medium">{returnItem.id}</TableCell>
                  <TableCell>{returnItem.orderId}</TableCell>
                  <TableCell>{returnItem.customer}</TableCell>
                  <TableCell>{returnItem.product}</TableCell>
                  <TableCell>{returnItem.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        returnItem.status === "Approved"
                          ? "default"
                          : returnItem.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {returnItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{returnItem.date}</TableCell>
                  <TableCell className="font-medium">{returnItem.refundAmount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Approve Return
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <X className="mr-2 h-4 w-4" />
                          Reject Return
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
