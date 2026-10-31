import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - Elegant Fashion",
  description: "Frequently asked questions about our products, shipping, returns, and more.",
}

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) and international shipping options are also available. You will receive a tracking number once your order ships.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Customs duties and taxes may apply depending on your location.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After this time, orders enter our fulfillment process and cannot be changed. Please contact customer service immediately if you need to make changes.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unworn items in original condition with tags attached. Items must be returned in original packaging. Sale items and personalized items are final sale.",
      },
      {
        question: "How do I return an item?",
        answer:
          'Log into your account and select "Return Items" from your order history. Print the prepaid return label and drop off at any authorized shipping location. Refunds are processed within 5-7 business days of receiving your return.',
      },
      {
        question: "Can I exchange for a different size?",
        answer:
          "Yes, we offer free exchanges for different sizes within 30 days. Use our online exchange portal or contact customer service to initiate an exchange.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find my size?",
        answer:
          "Use our detailed size guide available on each product page. We provide measurements in both inches and centimeters. If you're between sizes, we recommend sizing up for a more comfortable fit.",
      },
      {
        question: "Are your products sustainable?",
        answer:
          "Yes, sustainability is core to our mission. We use eco-friendly materials like organic cotton, recycled fibers, and responsibly sourced fabrics. Our packaging is also recyclable and minimal.",
      },
      {
        question: "How should I care for my garments?",
        answer:
          "Care instructions are provided on each product page and garment label. Generally, we recommend gentle machine wash in cold water and air drying to maintain quality and longevity.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted.",
      },
      {
        question: "Do I need an account to place an order?",
        answer:
          "No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and enjoy faster checkout for future purchases.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never store credit card details and comply with all data protection regulations.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 text-balance">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our products, orders, and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-serif text-foreground mb-6 border-b border-border pb-2">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-serif text-foreground mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our customer service team is here to help you with any additional questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@elegantfashion.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
