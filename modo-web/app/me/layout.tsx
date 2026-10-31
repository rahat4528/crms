import TopBar from "@/components/top-bar"
import SiteFooter from "@/components/site-footer"
import MeSidebar from "@/components/me-sidebar"
import TrailNav from "@/components/trail-nav"

export const dynamic = "force-dynamic"

export default function MeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar />
      <main className="flex-1 container-virga py-8 space-y-6">
        <TrailNav items={[{ label: "Client Account", href: "/me" }]} />
        <div className="flex flex-col md:flex-row gap-8">
          <MeSidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

