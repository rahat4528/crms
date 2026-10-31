import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function MeWishlistPage() {
  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-border/60">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Saved Pieces
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Pieces you have curated for future consideration.
        </p>
      </div>

      <div className="p-12 rounded-3xl bg-card border border-border/80 text-center space-y-3">
        <Heart className="h-8 w-8 text-primary/40 mx-auto" />
        <h3 className="font-heading text-base font-semibold text-foreground">Your Wishlist is Empty</h3>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Save your favorite pieces while browsing by clicking the heart icon on any piece.
        </p>
        <Button asChild size="sm" className="rounded-full text-xs">
          <Link href="/shop">Browse Catalog</Link>
        </Button>
      </div>
    </div>
  )
}

