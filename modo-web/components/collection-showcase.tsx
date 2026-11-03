import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface CollectionSummary {
  _id: string
  title: string
  slug: string
  description?: string
  cover?: string
}

interface CollectionShowcaseProps {
  collections?: CollectionSummary[]
}

export function CollectionShowcase({ collections = [] }: CollectionShowcaseProps) {
  if (!collections || collections.length === 0) return null

  const featured = collections[0]
  const supporting = collections.slice(1, 4)

  return (
    <section className="py-16 sm:py-24 border-b border-border/80 bg-background">
      <div className="container-virga space-y-10">
        {/* Section Header with Refined Editorial Hierarchy */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <span className="editorial-caps text-primary">Curated Series</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Considered Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Composition (1 Major Focal + 3 Secondary Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Primary Featured Collection Card */}
          {featured && (
            <Link
              href={`/collections/${featured.slug}`}
              className="lg:col-span-6 group relative block overflow-hidden rounded-2xl bg-muted aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] border border-border/80 shadow-sm transition-all duration-300"
            >
              {featured.cover ? (
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                  {featured.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white space-y-2">
                <span className="editorial-caps text-[10px] text-white/70">Series 01 · Feature</span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed max-w-md font-light">
                    {featured.description}
                  </p>
                )}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-white uppercase group-hover:underline underline-offset-4">
                    Explore Pieces <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Supporting Collections Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            {supporting.map((col, idx) => (
              <Link
                key={col._id}
                href={`/collections/${col.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-muted aspect-[3/4] border border-border/80 shadow-sm transition-all duration-300"
              >
                {col.cover ? (
                  <Image
                    src={col.cover}
                    alt={col.title}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                    {col.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-4 text-white space-y-1">
                  <span className="editorial-caps text-[9px] text-white/60">
                    Series 0{idx + 2}
                  </span>
                  <h4 className="font-heading text-lg font-bold tracking-tight text-white line-clamp-1">
                    {col.title}
                  </h4>
                  <span className="text-[11px] font-medium text-white/80 inline-flex items-center gap-0.5 group-hover:underline">
                    Discover <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionShowcase
