"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Send, Copy, Edit, Trash2, BarChart3 } from "lucide-react"
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

const campaigns = [
  {
    id: "1",
    name: "Welcome Series - Email 1",
    subject: "Welcome to Our Store!",
    type: "Welcome",
    status: "Sent",
    recipients: 1234,
    openRate: "24.5%",
    clickRate: "3.2%",
    sentDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Flash Sale Announcement",
    subject: "⚡ 48-Hour Flash Sale - Up to 50% Off!",
    type: "Promotional",
    status: "Sent",
    recipients: 5678,
    openRate: "31.8%",
    clickRate: "8.7%",
    sentDate: "2024-01-14",
  },
  {
    id: "3",
    name: "Abandoned Cart Recovery",
    subject: "Don't forget your items!",
    type: "Automated",
    status: "Active",
    recipients: 234,
    openRate: "18.3%",
    clickRate: "12.1%",
    sentDate: "Ongoing",
  },
  {
    id: "4",
    name: "New Collection Launch",
    subject: "Introducing Our Spring Collection",
    type: "Newsletter",
    status: "Draft",
    recipients: 0,
    openRate: "-",
    clickRate: "-",
    sentDate: "Not sent",
  },
  {
    id: "5",
    name: "Customer Feedback Request",
    subject: "How was your recent purchase?",
    type: "Feedback",
    status: "Scheduled",
    recipients: 456,
    openRate: "-",
    clickRate: "-",
    sentDate: "2024-01-20",
  },
]

export function EmailCampaignTable() {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(campaigns.map((c) => c.id))
    } else {
      setSelectedCampaigns([])
    }
  }

  const handleSelectCampaign = (campaignId: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns([...selectedCampaigns, campaignId])
    } else {
      setSelectedCampaigns(selectedCampaigns.filter((id) => id !== campaignId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedCampaigns.length === campaigns.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCampaigns.includes(campaign.id)}
                    onCheckedChange={(checked) => handleSelectCampaign(campaign.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/marketing/email/${campaign.id}`} className="font-medium hover:underline">
                    {campaign.name}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs truncate">{campaign.subject}</TableCell>
                <TableCell>
                  <Badge variant="outline">{campaign.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      campaign.status === "Sent"
                        ? "default"
                        : campaign.status === "Active"
                          ? "default"
                          : campaign.status === "Scheduled"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                <TableCell>{campaign.openRate}</TableCell>
                <TableCell>{campaign.clickRate}</TableCell>
                <TableCell>{campaign.sentDate}</TableCell>
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
                        <Link href={`/admin/marketing/email/${campaign.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Campaign
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Campaign
                      </DropdownMenuItem>
                      {campaign.status === "Draft" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send Now
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Campaign
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
