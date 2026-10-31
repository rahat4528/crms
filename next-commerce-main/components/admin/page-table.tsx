"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Eye, Edit, Copy, Trash2, Globe, EyeOff } from "lucide-react"
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

const pages = [
  {
    id: "1",
    title: "Home Page",
    slug: "/",
    status: "Published",
    lastModified: "2024-01-15",
    author: "Admin",
    views: 12450,
  },
  {
    id: "2",
    title: "About Us",
    slug: "/about",
    status: "Published",
    lastModified: "2024-01-10",
    author: "Admin",
    views: 3240,
  },
  {
    id: "3",
    title: "Contact",
    slug: "/contact",
    status: "Published",
    lastModified: "2024-01-08",
    author: "Admin",
    views: 1890,
  },
  {
    id: "4",
    title: "Privacy Policy",
    slug: "/privacy",
    status: "Published",
    lastModified: "2024-01-05",
    author: "Admin",
    views: 567,
  },
  {
    id: "5",
    title: "New Landing Page",
    slug: "/landing",
    status: "Draft",
    lastModified: "2024-01-14",
    author: "Admin",
    views: 0,
  },
]

export function PageTable() {
  const [selectedPages, setSelectedPages] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPages(pages.map((p) => p.id))
    } else {
      setSelectedPages([])
    }
  }

  const handleSelectPage = (pageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId])
    } else {
      setSelectedPages(selectedPages.filter((id) => id !== pageId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedPages.length === pages.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPages.includes(page.id)}
                    onCheckedChange={(checked) => handleSelectPage(page.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/content/pages/${page.id}`} className="font-medium hover:underline">
                    {page.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">{page.slug}</code>
                </TableCell>
                <TableCell>
                  <Badge variant={page.status === "Published" ? "default" : "secondary"}>{page.status}</Badge>
                </TableCell>
                <TableCell>{page.author}</TableCell>
                <TableCell>{page.views.toLocaleString()}</TableCell>
                <TableCell>{page.lastModified}</TableCell>
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
                        <Link href={`/admin/content/pages/${page.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Page
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
                        {page.status === "Published" ? (
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
                        Delete Page
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
