import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Elegant Fashion",
  description: "Learn about our story, values, and commitment to sustainable luxury fashion.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 text-balance">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Founded on the principles of timeless elegance and sustainable luxury, we create fashion that transcends
            seasons and trends.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="/elegant-fashion-atelier.jpg"
              alt="Our fashion atelier"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-foreground mb-6">Crafted with Purpose</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Since our founding in 2015, we have been dedicated to creating exceptional pieces that honor both
              craftsmanship and consciousness. Every garment tells a story of meticulous attention to detail and respect
              for the artisans who bring our designs to life.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our commitment extends beyond fashion to encompass environmental responsibility and ethical production
              practices, ensuring that beauty and sustainability walk hand in hand.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We prioritize eco-friendly materials and ethical production methods to minimize our environmental
                impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Quality</h3>
              <p className="text-muted-foreground">
                Every piece is crafted with the finest materials and attention to detail, ensuring longevity and
                timeless appeal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
              <p className="text-muted-foreground">
                We support local artisans and communities, fostering relationships that create positive social impact.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-serif text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/team-member-1.jpg"
                alt="Sarah Chen, Creative Director"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">Sarah Chen</h3>
              <p className="text-primary mb-2">Creative Director</p>
              <p className="text-sm text-muted-foreground">
                With over 15 years in luxury fashion, Sarah brings visionary design and sustainable innovation to every
                collection.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/team-member-2.jpg"
                alt="Marcus Rodriguez, Head of Production"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">Marcus Rodriguez</h3>
              <p className="text-primary mb-2">Head of Production</p>
              <p className="text-sm text-muted-foreground">
                Marcus ensures every piece meets our exacting standards while maintaining ethical production practices.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/team-member-3.jpg"
                alt="Elena Volkov, Sustainability Officer"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">Elena Volkov</h3>
              <p className="text-primary mb-2">Sustainability Officer</p>
              <p className="text-sm text-muted-foreground">
                Elena leads our environmental initiatives and ensures our commitment to sustainable luxury remains at
                the forefront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
