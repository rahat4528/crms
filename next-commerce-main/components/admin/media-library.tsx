"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Search, Filter, Grid, List, MoreHorizontal, Download, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const mediaFiles = [
  {
    id: "1",
    name: "hero-banner.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-15",
    url: "/elegant-silk-midi-dress.jpg",
  },
  {
    id: "2",
    name: "product-showcase.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "1200x800",
    uploadDate: "2024-01-14",
    url: "/elegant-silk-blouse.jpg",
  },
  {
    id: "3",
    name: "brand-logo.svg",
    type: "vector",
    size: "45 KB",
    dimensions: "500x200",
    uploadDate: "2024-01-13",
    url: "/placeholder.svg?height=200&width=500",
  },
  {
    id: "4",
    name: "collection-video.mp4",
    type: "video",
    size: "15.2 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-12",
    url: "#",
  },
  {
    id: "5",
    name: "product-catalog.pdf",
    type: "document",
    size: "3.1 MB",
    dimensions: "-",
    uploadDate: "2024-01-11",
    url: "#",
  },
  {
    id: "6",
    name: "lifestyle-photo.jpg",
    type: "image",
    size: "2.1 MB",
    dimensions: "1600x900",
    uploadDate: "2024-01-10",
    url: "/elegant-cashmere-sweater.jpg",
  },
]

export function MediaLibrary() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(mediaFiles.map((f) => f.id))
    } else {
      setSelectedFiles([])
    }
  }

  const handleSelectFile = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId])
    } else {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId))
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️"
      case "video":
        return "🎥"
      case "document":
        return "📄"
      case "vector":
        return "🎨"
      default:
        return "📁"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {mediaFiles.map((file) => (
                <Card key={file.id} className="group relative">
                  <CardContent className="p-3">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={(checked) => handleSelectFile(file.id, checked as boolean)}
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="aspect-square rounded-md overflow-hidden bg-muted mb-2">
                      {file.type === "image" ? (
                        <Image
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="border-b p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox checked={selectedFiles.length === mediaFiles.length} onCheckedChange={handleSelectAll} />
                    <span className="text-sm font-medium">Select All</span>
                  </div>
                </div>
                <div className="divide-y">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={(checked) => handleSelectFile(file.id, checked as boolean)}
                      />
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {file.type === "image" ? (
                          <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.dimensions} • {file.size} • {file.uploadDate}
                        </p>
                      </div>
                      <Badge variant="outline">{file.type}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="images">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {mediaFiles
              .filter((file) => file.type === "image")
              .map((file) => (
                <Card key={file.id} className="group relative">
                  <CardContent className="p-3">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={(checked) => handleSelectFile(file.id, checked as boolean)}
                      />
                    </div>
                    <div className="aspect-square rounded-md overflow-hidden bg-muted mb-2">
                      <Image
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{file.dimensions}</span>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No videos uploaded yet</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No documents uploaded yet</p>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
