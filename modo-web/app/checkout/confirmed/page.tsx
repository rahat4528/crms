import Link from "next/link"
import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, ArrowRight } from "lucide-react"

interface ConfirmedPageProps {
  searchParams: Promise<{ orderNo?: string }>
}

export default async function ConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const { orderNo } = await searchParams

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-modo py-16 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-border/80 shadow-sm">
          <div className="h-16 w-16 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Order Confirmed
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Thank You for Your Order
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We have received your selection and are preparing it with care in our atelier.
            </p>
          </div>

          {orderNo && (
            <div className="p-4 rounded-2xl bg-muted/60 border border-border/60 text-center">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                Reference Number
              </span>
              <span className="font-mono text-base font-bold text-foreground">
                {orderNo}
              </span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Button asChild size="lg" className="w-full rounded-full shadow-sm">
              <Link href="/me/orders">
                <Package className="mr-2 h-4 w-4" />
                View in Your Orders
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full rounded-full">
              <Link href="/shop">
                Continue Browsing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

