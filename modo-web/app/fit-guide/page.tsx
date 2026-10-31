import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import TrailNav from "@/components/trail-nav"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function FitGuidePage() {
  const sizeData = [
    { size: "XS", chest: '34" - 36"', waist: '28" - 30"', hips: '34" - 36"' },
    { size: "S", chest: '36" - 38"', waist: '30" - 32"', hips: '36" - 38"' },
    { size: "M", chest: '38" - 40"', waist: '32" - 34"', hips: '38" - 40"' },
    { size: "L", chest: '40" - 42"', waist: '34" - 36"', hips: '40" - 42"' },
    { size: "XL", chest: '42" - 44"', waist: '36" - 38"', hips: '42" - 44"' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-12 space-y-8 max-w-3xl">
        <TrailNav items={[{ label: "Fit & Sizing Guide" }]} />

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Proportions
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Fit & Measurement Guide
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our garments are cut with intentional ease for natural drape. Use the measurements below to determine your ideal size.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Size</TableHead>
                <TableHead>Chest (in)</TableHead>
                <TableHead>Waist (in)</TableHead>
                <TableHead>Hips (in)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeData.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-bold text-foreground">{row.size}</TableCell>
                  <TableCell className="text-sm">{row.chest}</TableCell>
                  <TableCell className="text-sm">{row.waist}</TableCell>
                  <TableCell className="text-sm">{row.hips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

