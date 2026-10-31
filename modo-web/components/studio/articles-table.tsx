import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export interface ArticleRowData {
  _id: string
  title: string
  slug: string
  readingMinutes: number
  state: string
  publishedAt: string
}

interface ArticlesTableProps {
  articles: ArticleRowData[]
}

export function ArticlesTable({ articles = [] }: ArticlesTableProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Article Title</TableHead>
            <TableHead>Reading Time</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                No journal articles written yet.
              </TableCell>
            </TableRow>
          ) : (
            articles.map((art) => (
              <TableRow key={art._id}>
                <TableCell className="font-medium text-foreground">
                  {art.title}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {art.readingMinutes} min read
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(art.publishedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-full text-[10px] capitalize">
                    {art.state}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full">
                    <Link href={`/journal/${art.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ArticlesTable

