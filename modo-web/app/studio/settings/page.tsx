import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function StudioSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Studio Configuration
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Store profile, currency, shipping zones, and integration keys.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-heading text-base font-bold text-foreground">Store Identity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input defaultValue="Modo" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input defaultValue="Considered Fashion & Living" className="rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Contact Concierge Email</Label>
            <Input defaultValue="concierge@modo.store" className="rounded-xl" />
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 space-y-4">
          <h3 className="font-heading text-base font-bold text-foreground">Shipping Policies</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Free Shipping Threshold ($)</Label>
              <Input defaultValue="150" type="number" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Standard Shipping Flat Rate ($)</Label>
              <Input defaultValue="12" type="number" className="rounded-xl" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 space-y-3">
          <h3 className="font-heading text-base font-bold text-foreground">Operations Toggles</h3>
          <div className="flex items-center justify-between">
            <Label className="cursor-pointer">Enable Complimentary Exchanges (30 days)</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="cursor-pointer">Automatic Low-Stock Email Alerts</Label>
            <Switch defaultChecked />
          </div>
        </div>

        <Button size="sm" className="rounded-full px-6">
          Save Configuration
        </Button>
      </div>
    </div>
  )
}

