import dbConnect from "@/lib/db"
import Item from "@/models/Item"
import { formatPrice } from "@/lib/cn"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function StudioStockPage() {
  await dbConnect()

  const items = await Item.find().sort({ stock: 1 }).lean()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Stock & Inventory Levels
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor SKU units, low-stock alerts, and warehouse reserves.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Piece</TableHead>
              <TableHead>SKU Options</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Units in Stock</TableHead>
              <TableHead className="text-right">Inventory Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: any) => {
              const isLowStock = item.stock > 0 && item.stock <= 5
              const isOut = item.stock <= 0

              return (
                <TableRow key={item._id}>
                  <TableCell className="font-semibold text-foreground text-sm">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.options?.length ? `${item.options.length} SKUs defined` : "Standard SKU"}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatPrice(item.price)}
                  </TableCell>
                  <TableCell className="font-bold text-sm">
                    {item.stock} units
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={isOut ? "destructive" : isLowStock ? "secondary" : "outline"}
                      className="rounded-full text-[10px]"
                    >
                      {isOut ? "Depleted" : isLowStock ? "Low Stock Alert" : "Healthy"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

