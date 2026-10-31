import CatalogForm from "@/components/studio/catalog-form"

export default function StudioQuickAddPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Quick Add Piece
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Rapidly publish a new garment or object directly to the active catalog.
        </p>
      </div>

      <CatalogForm />
    </div>
  )
}

