"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Copy, Edit, Trash2, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const coupons = [
  {
    id: "1",
    code: "WELCOME20",
    name: "Welcome Discount",
    type: "Percentage",
    value: "20%",
    minOrder: "$50",
    usage: "45/100",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "2",
    code: "FREESHIP",
    name: "Free Shipping",
    type: "Free Shipping",
    value: "Free",
    minOrder: "$75",
    usage: "234/500",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  },
  {
    id: "3",
    code: "SAVE50",
    name: "Fixed Amount Off",
    type: "Fixed Amount",
    value: "$50",
    minOrder: "$200",
    usage: "12/50",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
  },
  {
    id: "4",
    code: "EXPIRED10",
    name: "Expired Coupon",
    type: "Percentage",
    value: "10%",
    minOrder: "$25",
    usage: "89/100",
    status: "Expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
  },
  {
    id: "5",
    code: "PAUSED15",
    name: "Paused Promotion",
    type: "Percentage",
    value: "15%",
    minOrder: "$100",
    usage: "5/200",
    status: "Paused",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  },
]

export function CouponTable() {
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCoupons(coupons.map((c) => c.id))
    } else {
      setSelectedCoupons([])
    }
  }

  const handleSelectCoupon = (couponId: string, checked: boolean) => {
    if (checked) {
      setSelectedCoupons([...selectedCoupons, couponId])
    } else {
      setSelectedCoupons(selectedCoupons.filter((id) => id !== couponId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedCoupons.length === coupons.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Min Order</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCoupons.includes(coupon.id)}
                    onCheckedChange={(checked) => handleSelectCoupon(coupon.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-mono font-medium">{coupon.code}</div>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/marketing/coupons/${coupon.id}`} className="font-medium hover:underline">
                    {coupon.name}
                  </Link>
                </TableCell>
                <TableCell>{coupon.type}</TableCell>
                <TableCell className="font-medium">{coupon.value}</TableCell>
                <TableCell>{coupon.minOrder}</TableCell>
                <TableCell>{coupon.usage}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      coupon.status === "Active" ? "default" : coupon.status === "Paused" ? "secondary" : "destructive"
                    }
                  >
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell>{coupon.endDate}</TableCell>
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
                        <Link href={`/admin/marketing/coupons/${coupon.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Code
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Coupon
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        {coupon.status === "Active" ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Coupon
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Activate Coupon
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Coupon
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
