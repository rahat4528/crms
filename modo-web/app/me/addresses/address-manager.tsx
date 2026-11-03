"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Address {
  _id?: string
  label?: string
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  isDefault?: boolean
}

interface AddressManagerProps {
  initialAddresses: Address[]
}

export function AddressManager({ initialAddresses }: AddressManagerProps) {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    label: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    isDefault: false,
  })

  const resetForm = () => {
    setFormData({
      label: "Home",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      isDefault: false,
    })
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.street.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      toast.error("Please fill in all required address fields.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/me/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to save address")
      }

      toast.success("Address added successfully")
      setAddresses(data.data.addresses)
      setIsOpen(false)
      resetForm()
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to add address")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAddress = async (id?: string) => {
    if (!id) return
    setDeletingId(id)

    try {
      const res = await fetch(`/api/me/addresses?addressId=${id}`, {
        method: "DELETE",
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to delete address")
      }

      toast.success("Address removed")
      setAddresses(data.data.addresses)
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to delete address")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-border/60">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Address Book
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your saved delivery destinations.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-full text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Add New Address</DialogTitle>
              <DialogDescription className="text-xs">
                Save a delivery location for faster checkout.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddAddress} className="space-y-3.5 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="addr-label" className="text-xs">Address Label</Label>
                <Input
                  id="addr-label"
                  placeholder="e.g. Home, Studio, Office"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  maxLength={50}
                  className="rounded-xl h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="addr-street" className="text-xs">Street Address *</Label>
                <Input
                  id="addr-street"
                  placeholder="123 Serene Way, Apt 4"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  maxLength={200}
                  required
                  className="rounded-xl h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="addr-city" className="text-xs">City *</Label>
                  <Input
                    id="addr-city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    maxLength={100}
                    required
                    className="rounded-xl h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-state" className="text-xs">State / Province</Label>
                  <Input
                    id="addr-state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    maxLength={100}
                    className="rounded-xl h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="addr-postal" className="text-xs">Postal Code *</Label>
                  <Input
                    id="addr-postal"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    maxLength={20}
                    required
                    className="rounded-xl h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="addr-country" className="text-xs">Country</Label>
                  <Input
                    id="addr-country"
                    placeholder="US"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    maxLength={10}
                    required
                    className="rounded-xl h-9 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="addr-default"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                <Label htmlFor="addr-default" className="text-xs cursor-pointer">
                  Set as default shipping address
                </Label>
              </div>

              <DialogFooter className="pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full text-xs px-5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                      Saving...
                    </>
                  ) : (
                    "Save Address"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="p-8 rounded-3xl bg-card border border-border/80 col-span-2 text-center text-xs text-muted-foreground">
            No saved addresses. Add an address above to expedite future orders.
          </div>
        ) : (
          addresses.map((addr, idx) => (
            <div
              key={addr._id || idx}
              className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm space-y-2 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{addr.label || "Address"}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-normal">
                      Default
                    </span>
                  )}
                </div>

                {addr._id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAddress(addr._id)}
                    disabled={deletingId === addr._id}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-full"
                    title="Delete address"
                  >
                    {deletingId === addr._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">{addr.street}</p>
              <p className="text-xs text-muted-foreground">
                {addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postalCode}
              </p>
              <p className="text-xs text-muted-foreground">{addr.country}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
