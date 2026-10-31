import StudioNav from "@/components/studio/studio-nav"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const role = session?.user?.role || "client"

  // Role guard for Studio
  if (!session?.user) {
    redirect("/login?callbackUrl=/studio")
  }
  if (!["staff", "manager", "owner", "admin"].includes(role)) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <StudioNav />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/80 px-8 flex items-center justify-between bg-card/60 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Virga Studio Workspace
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-muted-foreground">{session?.user?.email}</span>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold capitalize">
              {role}
            </span>
          </div>
        </header>
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

