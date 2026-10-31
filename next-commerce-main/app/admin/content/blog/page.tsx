import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogTable } from "@/components/admin/blog-table"
import { Search, Filter, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const blogStats = [
  { title: "Published Posts", value: "23", change: "+5%" },
  { title: "Draft Posts", value: "8", change: "+2%" },
  { title: "Total Views", value: "45.2K", change: "+18%" },
  { title: "Comments", value: "234", change: "+12%" },
]

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content and articles</p>
        </div>
        <Button asChild>
          <Link href="/admin/content/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Blog Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {blogStats.map((stat) => (
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
          <Input placeholder="Search posts..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <BlogTable />
    </div>
  )
}
