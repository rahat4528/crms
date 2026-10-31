import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockExchanges = [
  { id: "EX-101", orderNo: "MD-2026-891204", client: "Sophia Chen", piece: "Relaxed Wool Blazer (Size S → M)", reason: "Fit adjustment", status: "Approved" },
  { id: "EX-102", orderNo: "MD-2026-441920", client: "Julian Rivera", piece: "Penny Loafer", reason: "Color preference", status: "Pending Inspection" },
]

export default function StudioExchangesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Exchanges & Complimentary Returns
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review return requests, verify condition inspection, and process exchanges.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Exchange ID</TableHead>
              <TableHead>Order #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Piece & Exchange Request</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExchanges.map((ex) => (
              <TableRow key={ex.id}>
                <TableCell className="font-mono text-xs font-bold text-foreground">{ex.id}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{ex.orderNo}</TableCell>
                <TableCell className="text-sm font-medium">{ex.client}</TableCell>
                <TableCell className="text-sm text-foreground/90">{ex.piece}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{ex.reason}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="rounded-full text-[10px]">
                    {ex.status}
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

