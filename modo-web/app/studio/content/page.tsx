import dbConnect from "@/lib/db"
import { HeroBanner, HomeBlock } from "@/models/Blocks"
import JournalEntry from "@/models/JournalEntry"
import AssetLibrary from "@/components/studio/asset-library"
import ArticlesTable from "@/components/studio/articles-table"
import PagesTable from "@/components/studio/pages-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function StudioContentPage() {
  await dbConnect()

  const [banner, blocks, articleDocs] = await Promise.all([
    HeroBanner.findOne({ isLive: true }).lean(),
    HomeBlock.find().sort({ position: 1 }).lean(),
    JournalEntry.find().sort({ publishedAt: -1 }).lean(),
  ])

  const articles = JSON.parse(JSON.stringify(articleDocs))

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-border/60">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Content & Editorial CMS
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Curate homepage hero banner, dynamic home blocks, editorial journal dispatches, and media assets.
        </p>
      </div>

      <Tabs defaultValue="blocks" className="space-y-6">
        <TabsList className="rounded-2xl p-1 bg-muted">
          <TabsTrigger value="blocks" className="rounded-xl text-xs">Home Blocks</TabsTrigger>
          <TabsTrigger value="hero" className="rounded-xl text-xs">Hero Banner</TabsTrigger>
          <TabsTrigger value="journal" className="rounded-xl text-xs">Journal Articles</TabsTrigger>
          <TabsTrigger value="assets" className="rounded-xl text-xs">Asset Library</TabsTrigger>
          <TabsTrigger value="pages" className="rounded-xl text-xs">Site Pages</TabsTrigger>
        </TabsList>

        {/* Home Blocks tab */}
        <TabsContent value="blocks" className="space-y-4">
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Homepage Layout Blocks ({blocks.length} active)
            </h3>
            <div className="space-y-3">
              {blocks.map((block: any) => (
                <div
                  key={block._id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-border/60"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-foreground">{block.heading}</span>
                      <Badge variant="outline" className="rounded-full text-[10px] uppercase">
                        {block.kind}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      Slug: /{block.slug} · Picking mode: {block.picking?.mode} · Layout: {block.display?.layout} ({block.display?.columns} cols)
                    </span>
                  </div>
                  <Badge variant={block.isLive ? "default" : "secondary"} className="rounded-full text-[10px]">
                    {block.isLive ? "Live" : "Draft"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Hero Banner tab */}
        <TabsContent value="hero" className="space-y-4">
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">Active Hero Banner</h3>
            {banner ? (
              <div className="p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Live Headline</span>
                <p className="font-heading text-2xl font-bold text-foreground">{banner.headline}</p>
                <p className="text-sm text-muted-foreground">{banner.subline}</p>
                <div className="pt-2 text-xs text-muted-foreground">
                  Primary Button: <span className="font-medium text-foreground">{banner.primaryCta?.label}</span> → {banner.primaryCta?.href}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No banner currently live.</p>
            )}
          </div>
        </TabsContent>

        {/* Journal tab */}
        <TabsContent value="journal" className="space-y-4">
          <ArticlesTable articles={articles} />
        </TabsContent>

        {/* Asset Library tab */}
        <TabsContent value="assets" className="space-y-4">
          <AssetLibrary />
        </TabsContent>

        {/* Pages tab */}
        <TabsContent value="pages" className="space-y-4">
          <PagesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

