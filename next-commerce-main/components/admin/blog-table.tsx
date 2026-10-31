"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Edit, Copy, Trash2, Globe, EyeOff, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const blogPosts = [
  {
    id: "1",
    title: "10 Fashion Trends for Spring 2024",
    slug: "fashion-trends-spring-2024",
    status: "Published",
    author: "Sarah Johnson",
    category: "Fashion",
    publishDate: "2024-01-15",
    views: 5420,
    comments: 23,
  },
  {
    id: "2",
    title: "How to Style Your Wardrobe for Any Occasion",
    slug: "style-wardrobe-any-occasion",
    status: "Published",
    author: "Emily Chen",
    category: "Style Guide",
    publishDate: "2024-01-12",
    views: 3890,
    comments: 18,
  },
  {
    id: "3",
    title: "Sustainable Fashion: Making Conscious Choices",
    slug: "sustainable-fashion-conscious-choices",
    status: "Published",
    author: "Michael Brown",
    category: "Sustainability",
    publishDate: "2024-01-10",
    views: 2340,
    comments: 12,
  },
  {
    id: "4",
    title: "Behind the Scenes: Our Design Process",
    slug: "behind-scenes-design-process",
    status: "Draft",
    author: "Sarah Johnson",
    category: "Behind the Scenes",
    publishDate: "2024-01-20",
    views: 0,
    comments: 0,
  },
  {
    id: "5",
    title: "Summer Collection Preview",
    slug: "summer-collection-preview",
    status: "Scheduled",
    author: "Emily Chen",
    category: "Collections",
    publishDate: "2024-01-25",
    views: 0,
    comments: 0,
  },
]

export function BlogTable() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(blogPosts.map((p) => p.id))
    } else {
      setSelectedPosts([])
    }
  }

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId])
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId))
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedPosts.length === blogPosts.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/content/blog/${post.id}`} className="font-medium hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">/{post.slug}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/placeholder-24px.png?height=24&width=24`} />
                      <AvatarFallback className="text-xs">{getInitials(post.author)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{post.author}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === "Published" ? "default" : post.status === "Scheduled" ? "secondary" : "outline"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{post.publishDate}</span>
                  </div>
                </TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>{post.comments}</TableCell>
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
                        <Link href={`/admin/content/blog/${post.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Post
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Globe className="mr-2 h-4 w-4" />
                        View Live
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {post.status === "Published" ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Globe className="mr-2 h-4 w-4" />
                            Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Post
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
