import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Send, Copy, Trash2, BarChart3, Mail, Users, MousePointer } from "lucide-react"

interface EmailCampaignPageProps {
  params: {
    id: string
  }
}

const campaignData = {
  id: "1",
  name: "Welcome Series - Email 1",
  subject: "Welcome to Our Store!",
  type: "Welcome",
  status: "Sent",
  recipients: 1234,
  openRate: 24.5,
  clickRate: 3.2,
  bounceRate: 1.8,
  unsubscribeRate: 0.5,
  sentDate: "2024-01-15",
  createdDate: "2024-01-10",
  content: `
    <h1>Welcome to Our Store!</h1>
    <p>Thank you for joining our community. We're excited to have you on board!</p>
    <p>As a welcome gift, enjoy 20% off your first purchase with code WELCOME20.</p>
    <a href="#" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Shop Now</a>
  `,
  performance: {
    delivered: 1234,
    opened: 302,
    clicked: 39,
    bounced: 22,
    unsubscribed: 6,
  },
}

export default function EmailCampaignPage({ params }: EmailCampaignPageProps) {
  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaignData.name}</h1>
          <p className="text-muted-foreground">{campaignData.subject}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{campaignData.type}</Badge>
            <Badge variant={campaignData.status === "Sent" ? "default" : "secondary"}>{campaignData.status}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Campaign
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Again
          </Button>
          <Button variant="outline" className="text-destructive bg-transparent">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Campaign Performance */}
        <div className="md:col-span-2 space-y-6">
          {/* Performance Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.performance.delivered.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opened</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.performance.opened}</div>
                <p className="text-xs text-muted-foreground">{campaignData.openRate}% open rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clicked</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.performance.clicked}</div>
                <p className="text-xs text-muted-foreground">{campaignData.clickRate}% click rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounced</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignData.performance.bounced}</div>
                <p className="text-xs text-muted-foreground">{campaignData.bounceRate}% bounce rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Email Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white">
                <div dangerouslySetInnerHTML={{ __html: campaignData.content }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Info */}
        <div className="space-y-6">
          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Campaign Type</label>
                <p className="text-sm text-muted-foreground">{campaignData.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Recipients</label>
                <p className="text-sm text-muted-foreground">{campaignData.recipients.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Sent Date</label>
                <p className="text-sm text-muted-foreground">{campaignData.sentDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Created Date</label>
                <p className="text-sm text-muted-foreground">{campaignData.createdDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Open Rate</span>
                  <span className="font-medium">{campaignData.openRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${campaignData.openRate}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Click Rate</span>
                  <span className="font-medium">{campaignData.clickRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${campaignData.clickRate * 10}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bounce Rate</span>
                  <span className="font-medium">{campaignData.bounceRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${campaignData.bounceRate * 10}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
