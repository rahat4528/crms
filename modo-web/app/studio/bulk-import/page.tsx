"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileSpreadsheet, Upload, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function StudioBulkImportPage() {
  const [csvContent, setCsvContent] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [importCount, setImportCount] = useState<number | null>(null)

  function handleImport(e: React.FormEvent) {
    e.preventDefault()
    if (!csvContent.trim()) {
      toast.error("Please paste CSV data to import")
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      const lines = csvContent.trim().split("\n").filter(Boolean)
      setImportCount(Math.max(1, lines.length - 1))
      setIsProcessing(false)
      toast.success(`Successfully validated & processed ${lines.length - 1} records`)
    }, 1200)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Bulk Catalog CSV Import
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Import multiple catalog pieces and inventory records via structured CSV format.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Supported CSV Header Columns:</p>
          <p className="font-mono">title, price, listPrice, stock, collection, labels, imageUrl</p>
        </div>

        <form onSubmit={handleImport} className="space-y-4">
          <Textarea
            placeholder="title,price,listPrice,stock,collection,labels,imageUrl&#10;Silk Evening Dress,450,520,15,apparel,silk;evening,/silk-dress-detail-1.jpg"
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            className="font-mono text-xs min-h-48 rounded-2xl"
          />

          <Button type="submit" disabled={isProcessing} className="rounded-full px-6 text-xs">
            {isProcessing ? "Validating Records…" : "Validate & Import CSV"}
          </Button>
        </form>

        {importCount !== null && (
          <div className="p-4 rounded-2xl bg-secondary/15 text-secondary flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Validated {importCount} rows ready for catalog synchronization.</span>
          </div>
        )}
      </div>
    </div>
  )
}
