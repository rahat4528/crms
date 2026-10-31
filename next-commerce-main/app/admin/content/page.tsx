import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTable } from "@/components/admin/page-table"
import { BlogTable } from "@/components/admin/blog-table"
import { MediaLibrary } from "@/components/admin/media-library"
import { Plus, FileText, PenTool, Image, BarChart3 } from "lucide-react"
import Link from "next/link"

const contentStats = [
  { title: "Total Pages", value: "12", change: "+2", icon: FileText },
  { title: "Blog Posts", value: "45", change: "+8", icon: PenTool },
  { title: "Media Files", value: "234", change: "+23", icon: Image },
  { title: "Page Views", value: "18.2K", change: "+12%", icon: BarChart3 },
]

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage your website content, blog posts, and media files</p>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentStats.map((stat) => {
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

      <Tabs defaultValue="pages" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/admin/content/pages/new">
                <Plus className="mr-2 h-4 w-4" />
                New Page
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/content/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        <TabsContent value="pages" className="space-y-4">
          <PageTable />
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <BlogTable />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <MediaLibrary />
        </TabsContent>
      </Tabs>
    </div>
  )
}
