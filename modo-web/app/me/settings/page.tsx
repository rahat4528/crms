import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SettingsForm } from "./settings-form"

export const dynamic = "force-dynamic"

export default async function MeSettingsPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login?callbackUrl=/me/settings")
  }

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

      <SettingsForm
        initialName={session.user.name || ""}
        email={session.user.email || ""}
      />
    </div>
  )
}
