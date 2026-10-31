import { Gift, Award, Sparkles } from "lucide-react"

export default function MeRewardsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-border/60">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Virga Rewards & Tiers
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Exclusive benefits, tier progress, and concierge privileges.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Current Tier</span>
            <h3 className="font-heading text-xl font-bold text-foreground">Atelier Member</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/60">
            <span className="text-xs text-muted-foreground block">Available Points</span>
            <span className="font-heading text-xl font-bold text-foreground">450 pts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/60">
            <span className="text-xs text-muted-foreground block">Complimentary Shipping</span>
            <span className="font-heading text-sm font-semibold text-foreground">Always Included</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border/60">
            <span className="text-xs text-muted-foreground block">Early Drop Access</span>
            <span className="font-heading text-sm font-semibold text-secondary">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

