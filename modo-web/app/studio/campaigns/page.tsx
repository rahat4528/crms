import dbConnect from "@/lib/db"
import PromoCode from "@/models/PromoCode"
import PromoTable from "@/components/studio/promo-table"
import CampaignsTable from "@/components/studio/campaigns-table"

export const dynamic = "force-dynamic"

export default async function StudioCampaignsPage() {
  await dbConnect()

  const promoDocs = await PromoCode.find().lean()
  const promos = JSON.parse(JSON.stringify(promoDocs))

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Campaigns & Promotions
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Deploy client dispatches, manage promotional savings codes, and review redemption stats.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-foreground">Active Promotional Codes</h2>
        <PromoTable promos={promos} />
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-foreground">Client Email Dispatches</h2>
        <CampaignsTable />
      </div>
    </div>
  )
}

