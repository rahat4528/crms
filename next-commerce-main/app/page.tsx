import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import  DynamicProductSections  from "@/components/dynamic-product-sections"
import { CategoryShowcase } from "@/components/category-showcase"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DynamicProductSections />
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  )
}
