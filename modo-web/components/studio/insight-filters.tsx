"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"

export function InsightFilters() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80">
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Select defaultValue="30d">
          <SelectTrigger className="w-36 rounded-full text-xs">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl text-xs">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last quarter</SelectItem>
            <SelectItem value="1y">Trailing year</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-40 rounded-full text-xs">
            <SelectValue placeholder="Channel" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl text-xs">
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="online">Storefront Web</SelectItem>
            <SelectItem value="concierge">Studio Concierge</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" className="rounded-full text-xs w-full sm:w-auto">
        <Download className="h-3.5 w-3.5 mr-1.5" />
        Export CSV
      </Button>
    </div>
  )
}

export default InsightFilters

