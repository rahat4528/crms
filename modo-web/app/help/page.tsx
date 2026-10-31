import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "How does Virga ship worldwide?",
    a: "All orders are dispatched from our Italian and US distribution facilities via carbon-neutral express courier. Orders over $150 receive complimentary delivery.",
  },
  {
    q: "What is your exchange and return policy?",
    a: "We offer complimentary 30-day returns and exchanges. Items must be unwashed, unworn, and retain all original fabric seals.",
  },
  {
    q: "How are Virga fibers sourced?",
    a: "We use exclusively GOTS-certified organic cotton, certified mulesing-free virgin wool, and sustainably harvested Mongolian cashmere with complete traceability.",
  },
  {
    q: "How can I track my shipment?",
    a: "Once dispatched, you will receive a tracking link via email. You can also track your shipment status at /track using your order number and email.",
  },
  {
    q: "Can I receive styling and fit advice?",
    a: "Yes. Our concierge stylists are available daily via live chat and our Reach Us portal to recommend sizing, layering palettes, and modular wardrobe planning.",
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-12 space-y-8 max-w-3xl">
        <TrailNav items={[{ label: "Help & FAQ" }]} />

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Client Support
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Frequently Answered Inquiries
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Find immediate clarity regarding shipping, sizing, materials, and exchanges.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full divide-y divide-border/60">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-border/60">
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-5 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <SiteFooter />
    </div>
  )
}

