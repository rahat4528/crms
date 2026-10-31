import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew: boolean
  isSale: boolean
}

const relatedProducts: Product[] = [
  {
    id: 7,
    name: "Silk Blouse",
    price: 159,
    image: "/elegant-silk-blouse.jpg",
    category: "Tops",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Tailored Trousers",
    price: 199,
    originalPrice: 249,
    image: "/tailored-trousers.jpg",
    category: "Bottoms",
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: "Pearl Necklace",
    price: 89,
    image: "/pearl-necklace.jpg",
    category: "Accessories",
    isNew: false,
    isSale: false,
  },
  {
    id: 10,
    name: "Cashmere Cardigan",
    price: 229,
    image: "/cashmere-cardigan.jpg",
    category: "Outerwear",
    isNew: true,
    isSale: false,
  },
]

export function RelatedProducts() {
  return (
    <section className="py-8">
      <h3 className="text-2xl font-light tracking-tight mb-6">You Might Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                )}
                {product.isSale && (
                  <Badge variant="destructive" className="text-xs">
                    Sale
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" className="h-8">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
              <Link href={`/product/${product.id}`}>
                <h4 className="font-medium mb-2 hover:underline">{product.name}</h4>
              </Link>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
