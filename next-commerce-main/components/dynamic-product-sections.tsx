'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from '@/types/product';
import { PageSection } from '@/types/page-sections';
import Image from 'next/image';



function ProductCard({ product }: { product: Product; }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden">
        <Image
          src={product.images?.[0].url || "/placeholder.svg"}
          alt={product.name}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={200}
          height={120}
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
        <div className="text-sm text-muted-foreground mb-1">{product.category?.id}</div>
        <Link href={`/product/${product._id}`}>
          <h3 className="font-medium mb-2 hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>


        <div className="flex items-center mt-1">
          <span className="text-sm text-muted-foreground">★ {product?.rating?.average}/5</span>
        </div>

      </CardContent>
    </Card>
  );
}

export default function DynamicProductSections() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [sectionProducts, setSectionProducts] = useState<{ [key: string]: Product[] }>({});
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    setLoading(true);
    try {
      // Fetch active product sections
      const response = await fetch('/api/page-sections');
      const result = await response.json();
      console.log("Fetched Sections ", result.data)

      if (result?.data) {
        setSections(result.data);
        // Fetch products for each section
        // for (const section of result.data) {
        //   await fetchSectionProducts(section);
        // }
      } else {
        console.warn('No sections returned from /api/page-sections', result);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // const fetchSectionProducts = async (section: PageSection) => {
  //   try {
  //     // For now, we'll use fallback products since we don't have a products API yet
  //     // In a real implementation, you would fetch products based on section criteria
  //     setSectionProducts(prev => ({
  //       ...prev,
  //       [section._id]: fallbackProducts.slice(0, section.productSelection.criteria.limit)
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching products for section:', error);
  //   }
  // };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sections.map((section) => {
        console.log("Rendering section ", section)
        const gridCols = 'lg:grid-cols-6';

        return (
          <section key={section._id} className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                  {section.title}
                </h2>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {section.description}
                </p>

              </div>



              <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6`}>
                {section.products.map((product) => (
                  console.log("Rendering product ", product),
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>


              <div className="text-center mt-12">
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/products?section=${section._id}`}>
                    View All {section.title}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
