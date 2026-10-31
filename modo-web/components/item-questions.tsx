import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ItemQuestionsProps {
  details?: Array<{ label: string; value: string }>
}

export function ItemQuestions({ details = [] }: ItemQuestionsProps) {
  const defaultQuestions = [
    {
      q: "How should I care for this piece?",
      a: "We recommend specialist dry cleaning or gentle hand-washing in cold water with mild wool detergent. Lay flat to dry on a towel away from direct heat or sunlight.",
    },
    {
      q: "Where is this piece crafted?",
      a: "Modo garments are produced in ethical micro-ateliers across Marche and Tuscany, Italy, and Porto, Portugal. Each facility upholds living wages and fair labor standards.",
    },
    {
      q: "What is your exchange and return policy?",
      a: "We offer complimentary exchanges and returns within 30 days of delivery. Items must be unwashed, unworn, and with all original tags attached.",
    },
    {
      q: "How does the sizing run?",
      a: "Our silhouettes feature tailored modern proportions. We recommend ordering your standard size for an intentional relaxed fit. Check our Fit Guide for exact measurements.",
    },
  ]

  return (
    <div className="space-y-4 pt-8 border-t border-border/80">
      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
        Questions & Details
      </h3>

      {details.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
          {details.map((d) => (
            <div key={d.label} className="p-3.5 rounded-xl bg-muted/50 border border-border/60">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block">
                {d.label}
              </span>
              <span className="text-sm font-medium text-foreground mt-0.5 block">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        {defaultQuestions.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-border/60">
            <AccordionTrigger className="text-sm font-medium hover:no-underline py-4 text-left">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ItemQuestions

