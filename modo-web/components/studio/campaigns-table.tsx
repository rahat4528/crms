import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockCampaigns = [
  { id: "1", subject: "Autumn / Winter 2026: The Tactile Series", audience: "All Clients", state: "Sent", sentAt: "Oct 24, 2026", openRate: "48.2%" },
  { id: "2", subject: "Early Access: Biella Cashmere Editions", audience: "VIP Clients", state: "Sent", sentAt: "Oct 18, 2026", openRate: "62.1%" },
  { id: "3", subject: "Considered Living: Stoneware & Linen", audience: "Living Segment", state: "Draft", sentAt: "Scheduled Nov 5", openRate: "—" },
]

export function CampaignsTable() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Dispatch Subject</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead className="text-right">State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCampaigns.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium text-foreground">{c.subject}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{c.audience}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{c.sentAt}</TableCell>
              <TableCell className="text-xs font-semibold">{c.openRate}</TableCell>
              <TableCell className="text-right">
                <Badge variant={c.state === "Sent" ? "default" : "outline"} className="rounded-full text-[10px]">
                  {c.state}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CampaignsTable

