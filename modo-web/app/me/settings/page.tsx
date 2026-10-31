import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function MeSettingsPage() {
  const session = await auth()

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-border/60">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Client Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your account credentials and preferences.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" defaultValue={session?.user?.name || ""} className="rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue={session?.user?.email || ""} disabled className="rounded-xl bg-muted" />
        </div>

        <Button size="sm" className="rounded-full text-xs px-6">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

