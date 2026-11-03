"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface SettingsFormProps {
  initialName: string
  email: string
}

export function SettingsForm({ initialName, email }: SettingsFormProps) {
  const router = useRouter()
  const [name, setName] = useState(initialName)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasChanged = name.trim() !== initialName.trim()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters long.")
      return
    }
    if (trimmed.length > 100) {
      setError("Name cannot exceed 100 characters.")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to update profile")
      }

      toast.success("Profile updated successfully")
      router.refresh()
    } catch (err: any) {
      const msg = err.message || "Failed to update profile. Please try again."
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-5 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="rounded-xl"
          placeholder="Enter your name"
          required
        />
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          defaultValue={email}
          disabled
          className="rounded-xl bg-muted cursor-not-allowed opacity-80"
        />
        <p className="text-[11px] text-muted-foreground">
          Email address is tied to your account credentials and cannot be changed here.
        </p>
      </div>

      <Button
        type="submit"
        size="sm"
        disabled={isLoading || !hasChanged}
        className="rounded-full text-xs px-6 min-h-[38px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
            Saving Changes...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  )
}
