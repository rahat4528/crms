import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface TrailItem {
  label: string
  href?: string
}

interface TrailNavProps {
  items: TrailItem[]
}

export function TrailNav({ items }: TrailNavProps) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs text-muted-foreground">
      <ol className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center space-x-1 sm:space-x-2">
              <ChevronRight className="h-3 w-3 opacity-40 flex-shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-foreground truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors truncate max-w-[200px]">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default TrailNav

