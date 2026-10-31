"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export interface PromoRowData {
  _id: string
  code: string
  discountType: "percentage" | "fixed"
  value: number
  minSpend?: number
  usageCount: number
  isActive: boolean
}

interface PromoTableProps {
  promos?: PromoRowData[]
}

export function PromoTable({ promos = [] }: PromoTableProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Code</TableHead>
            <TableHead>Benefit</TableHead>
            <TableHead>Min. Spend</TableHead>
            <TableHead>Redemptions</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                No active promotional codes.
              </TableCell>
            </TableRow>
          ) : (
            promos.map((p) => (
              <TableRow key={p._id}>
                <TableCell className="font-mono font-bold text-foreground">
                  {p.code}
                </TableCell>
                <TableCell className="text-sm">
                  {p.discountType === "percentage" ? `${p.value}% Off` : `$${p.value} Flat Off`}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {p.minSpend ? `$${p.minSpend}` : "None"}
                </TableCell>
                <TableCell className="text-xs font-medium">
                  {p.usageCount} used
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={p.isActive ? "default" : "secondary"} className="rounded-full text-[10px]">
                    {p.isActive ? "Active" : "Paused"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default PromoTable

