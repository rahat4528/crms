import Link from "next/link"
import Image from "next/image"

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

  return (
    <section className="py-16 sm:py-24 border-b border-border/60">
      <div className="container-virga space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Curation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Explore Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Browse entire catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((col) => (
            <Link
              key={col._id}
              href={`/collections/${col.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-muted aspect-[3/4] border border-border/60 shadow-sm transition-transform hover:-translate-y-1 duration-200"
            >
              {col.cover ? (
                <Image
                  src={col.cover}
                  alt={col.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                  {col.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                <h3 className="font-heading text-xl font-bold tracking-tight">
                  {col.title}
                </h3>
                {col.description && (
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                )}
                <span className="inline-block text-xs font-medium text-white/90 pt-1 group-hover:underline">
                  Discover pieces →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionShowcase

