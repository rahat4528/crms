"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ShieldCheck, Lock } from "lucide-react"
import { toast } from "sonner"
import type { BagItemData } from "./bag-line"

interface CheckoutFlowProps {
  items: BagItemData[]
}

export function CheckoutFlow({ items }: CheckoutFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [street, setStreet] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("US")
  const [shippingMethod, setShippingMethod] = useState("standard")

  // Payment mock state
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")

  function handleShippingContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !fullName || !street || !city || !postalCode) {
      toast.error("Please fill in all required shipping address fields")
      return
    }
    setStep("payment")
  }

  async function handleFinalOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!cardNumber || !cardExpiry || !cardCvc) {
      toast.error("Please provide payment card details")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lines: items.map((i) => ({
            itemId: i.itemId,
            optionSku: i.optionSku,
            qty: i.qty,
          })),
          shipTo: {
            fullName,
            street,
            apartment,
            city,
            state,
            postalCode,
            country,
          },
          paymentProvider: "stripe",
        }),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        // Clear local bag
        if (typeof window !== "undefined") {
          localStorage.removeItem("virga_bag")
          localStorage.removeItem("modo_bag")
        }
        toast.success("Order confirmed!")
        router.push(`/checkout/confirmed?orderNo=${data.item.orderNo}`)
      } else {
        toast.error(data.error?.message || "Order processing failed. Please try again.")
      }
    } catch (err) {
      console.error("Order error:", err)
      toast.error("Network error while placing order")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Steps indicator */}
      <div className="flex items-center space-x-4 border-b border-border/80 pb-4 text-sm font-medium">
        <span
          className={`flex items-center space-x-2 ${
            step === "shipping" ? "text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
            1
          </span>
          <span>Delivery Details</span>
        </span>
        <span className="text-muted-foreground">/</span>
        <span
          className={`flex items-center space-x-2 ${
            step === "payment" ? "text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
            2
          </span>
          <span>Payment & Review</span>
        </span>
      </div>

      {step === "shipping" ? (
        <form onSubmit={handleShippingContinue} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">Contact Information</h3>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/60">
            <h3 className="font-heading text-lg font-bold text-foreground">Shipping Address</h3>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Eleanor Vance"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street address</Label>
              <Input
                id="street"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="45 Mercer Street"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment, suite, unit (optional)</Label>
              <Input
                id="apartment"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apt 4B"
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="New York"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="NY"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal / ZIP code</Label>
                <Input
                  id="postalCode"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="10013"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border/60">
            <h3 className="font-heading text-lg font-bold text-foreground">Delivery Method</h3>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
              <label
                htmlFor="std"
                className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-card cursor-pointer hover:border-primary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="standard" id="std" />
                  <div>
                    <p className="text-sm font-semibold">Standard Carbon-Neutral Delivery</p>
                    <p className="text-xs text-muted-foreground">3–5 business days</p>
                  </div>
                </div>
                <span className="text-sm font-medium">Included</span>
              </label>

              <label
                htmlFor="exp"
                className="flex items-center justify-between p-4 rounded-xl border border-border/80 bg-card cursor-pointer hover:border-primary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="express" id="exp" />
                  <div>
                    <p className="text-sm font-semibold">Express Atelier Courier</p>
                    <p className="text-xs text-muted-foreground">1–2 business days</p>
                  </div>
                </div>
                <span className="text-sm font-medium">$25.00</span>
              </label>
            </RadioGroup>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full shadow-md">
            Continue to Payment
          </Button>
        </form>
      ) : (
        <form onSubmit={handleFinalOrder} className="space-y-6">
          <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Deliver to:</span>
              <button
                type="button"
                onClick={() => setStep("shipping")}
                className="text-primary hover:underline font-medium"
              >
                Edit
              </button>
            </div>
            <p className="text-sm font-medium">{fullName} ({email})</p>
            <p className="text-xs text-muted-foreground">{street}, {city}, {postalCode}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-foreground">Payment Details</h3>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Card number</Label>
                <Input
                  id="card"
                  placeholder="4242 •••• •••• 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="rounded-xl font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="exp">Expiration (MM/YY)</Label>
                  <Input
                    id="exp"
                    placeholder="12/28"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                    className="rounded-xl font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="888"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                    className="rounded-xl font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-secondary flex-shrink-0" />
            <span>By placing this order you agree to Virga&apos;s Terms of Use and Return Policy.</span>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("shipping")}
              className="rounded-full px-6"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="flex-1 rounded-full shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Securing Order…
                </>
              ) : (
                "Authorize & Place Order"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CheckoutFlow

