import { auth } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { AddressManager } from "./address-manager"

export const dynamic = "force-dynamic"

export default async function MeAddressesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login?callbackUrl=/me/addresses")
  }

  await dbConnect()

  const user = await User.findById(session.user.id).select("addresses").lean()
  const rawAddresses = user?.addresses || []

  // Clean serialization for client component
  const addresses = rawAddresses.map((addr: any) => ({
    _id: addr._id ? addr._id.toString() : undefined,
    label: addr.label || "Home",
    street: addr.street || "",
    city: addr.city || "",
    state: addr.state || "",
    postalCode: addr.postalCode || "",
    country: addr.country || "US",
    isDefault: Boolean(addr.isDefault),
  }))

  return <AddressManager initialAddresses={addresses} />
}
