import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Women's Fashion",
    description: "Elegant dresses, sophisticated separates, and timeless accessories",
    image: "/elegant-women-fashion-collection.jpg",
    href: "/category/women",
  },
  {
    name: "Men's Collection",
    description: "Refined tailoring, premium materials, and contemporary designs",
    image: "/sophisticated-men-fashion-collection.jpg",
    href: "/category/men",
  },
  {
    name: "Home & Living",
    description: "Curated pieces to transform your space into a sanctuary",
    image: "/luxury-home-decor-and-furniture.jpg",
    href: "/category/home",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our thoughtfully organized collections designed to inspire and elevate your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={category.name} className={`group ${index === 0 ? "lg:col-span-2" : ""}`}>
              <div className="relative overflow-hidden rounded-lg h-96 lg:h-[500px]">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-light mb-3 text-balance">{category.name}</h3>
                  <p className="text-white/90 mb-6 text-pretty">{category.description}</p>
                  <Button variant="secondary" asChild>
                    <Link href={category.href}>Explore Collection</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
