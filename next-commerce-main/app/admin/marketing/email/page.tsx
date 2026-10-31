import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmailCampaignTable } from "@/components/admin/email-campaign-table"
import { Search, Filter, Download, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const emailStats = [
  { title: "Total Campaigns", value: "45", change: "+8%" },
  { title: "Active Campaigns", value: "12", change: "+3%" },
  { title: "Total Subscribers", value: "8,234", change: "+234%" },
  { title: "Avg Open Rate", value: "24.8%", change: "+2.1%" },
]

export default function EmailMarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-muted-foreground">Create and manage email campaigns and newsletters</p>
        </div>
        <Button asChild>
          <Link href="/admin/marketing/email/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Email Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {emailStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-10" />
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

      <EmailCampaignTable />
    </div>
  )
}
