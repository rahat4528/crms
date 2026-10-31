// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ArrowRight } from "lucide-react"

// export function HeroSection() {
//   return (
//     <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40 z-10 opacity-70" />
//       <img
//         src="/elegant-fashion-model-in-minimalist-setting.jpg"
//         alt="Hero fashion image"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
//         <h1 className="text-4xl md:text-6xl tracking-tight text-balance mb-6 text-background font-bold">
//           Discover Your Perfect Style
//         </h1>
//         <p className="text-lg md:text-xl text-background mb-8 text-pretty">
//           Curated collections of premium fashion and lifestyle products that define modern elegance.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Button size="lg" asChild>
//             <Link href="/category/women">
//               Shop Women
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//           <Button size="lg" variant="outline" asChild>
//             <Link href="/category/men">Shop Men</Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   )
// }




'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionData {
  _id: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
  isActive: boolean;
}

export function HeroSection() {
  const [heroData, setHeroData] = useState<HeroSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero-section');
      const result = await response.json();
      
      if (result.success && result.data) {
        setHeroData(result.data);
      }
    } catch (error) {
      console.error('Error fetching hero section:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 bg-gray-300 rounded w-32"></div>
            <div className="h-12 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show default content if no hero data is available
  if (!heroData || !heroData.isActive) {
    return (
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40 z-10 opacity-70" />
        <img
          src="/elegant-fashion-model-in-minimalist-setting.jpg"
          alt="Hero fashion image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl tracking-tight text-balance mb-6 text-background font-bold">
            Discover Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl text-background mb-8 text-pretty">
            Curated collections of premium fashion and lifestyle products that define modern elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/category/women">
                Shop Women
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/category/men">Shop Men</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Render dynamic hero section based on CMS data
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40 z-10 opacity-70" />
      {heroData.backgroundImage ? (
        <img
          src={heroData.backgroundImage}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src="/elegant-fashion-model-in-minimalist-setting.jpg"
          alt="Default hero image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl tracking-tight text-balance mb-6 text-background font-bold">
          {heroData.title}
        </h1>
        <p className="text-lg md:text-xl text-background mb-8 text-pretty">
          {heroData.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href={heroData.primaryButton.url}>
              {heroData.primaryButton.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={heroData.secondaryButton.url}>
              {heroData.secondaryButton.text}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}