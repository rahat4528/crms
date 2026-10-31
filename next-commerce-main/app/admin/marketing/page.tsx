import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CouponTable } from "@/components/admin/coupon-table"
import { EmailCampaignTable } from "@/components/admin/email-campaign-table"
import { Plus, TrendingUp, Users, Mail, Percent } from "lucide-react"
import Link from "next/link"

const marketingStats = [
  { title: "Active Campaigns", value: "12", change: "+3", icon: Mail },
  { title: "Total Coupons", value: "45", change: "+8", icon: Percent },
  { title: "Email Subscribers", value: "8,234", change: "+234", icon: Users },
  { title: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: TrendingUp },
]

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing & Promotions</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns, coupons, and promotions</p>
        </div>
      </div>

      {/* Marketing Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketingStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="coupons" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="coupons">Coupons & Discounts</TabsTrigger>
            <TabsTrigger value="email">Email Marketing</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/marketing/coupons/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Coupon
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/marketing/email/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Link>
            </Button>
          </div>
        </div>

        <TabsContent value="coupons" className="space-y-4">
          <CouponTable />
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <EmailCampaignTable />
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site-wide Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No active promotions</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Promotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
