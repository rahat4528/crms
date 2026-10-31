import dbConnect from "@/lib/db"
import Collection from "@/models/Collection"
import Item from "@/models/Item"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const dynamic = "force-dynamic"

export default async function StudioCollectionsPage() {
  await dbConnect()

  const collections = await Collection.find()
    .populate("children", "title slug isVisible")
    .populate("parent", "title slug")
    .sort({ position: 1 })
    .lean()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Collections Architecture
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Curate collection taxonomy, hierarchical nesting, and storefront visibility.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Collection</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Hierarchy</TableHead>
              <TableHead>Sub-Collections</TableHead>
              <TableHead className="text-right">Visibility</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((col: any) => (
              <TableRow key={col._id}>
                <TableCell className="font-semibold text-foreground text-sm">
                  {col.title}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  /{col.slug}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {col.parent ? `Sub-collection of ${col.parent.title}` : "Primary Collection"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {col.children?.length ? `${col.children.length} nested` : "None"}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={col.isVisible ? "default" : "secondary"} className="rounded-full text-[10px]">
                    {col.isVisible ? "Live" : "Hidden"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

