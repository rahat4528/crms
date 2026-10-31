import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const defaultPages = [
  { title: "Our Story", path: "/story", type: "Editorial Story", isPublished: true },
  { title: "Reach Us", path: "/reach-us", type: "Client Inquiries", isPublished: true },
  { title: "Help & FAQ", path: "/help", type: "Client Support", isPublished: true },
  { title: "Fit & Size Guide", path: "/fit-guide", type: "Sizing Specs", isPublished: true },
  { title: "Privacy Notice", path: "/privacy-notice", type: "Legal Policy", isPublished: true },
  { title: "Terms of Use", path: "/terms-of-use", type: "Legal Policy", isPublished: true },
]

export function PagesTable() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Page Title</TableHead>
            <TableHead>Route Path</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defaultPages.map((p) => (
            <TableRow key={p.path}>
              <TableCell className="font-semibold text-foreground text-sm">{p.title}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{p.path}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{p.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-full text-[10px]">
                  Published
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full">
                  <Link href={p.path} target="_blank">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PagesTable

