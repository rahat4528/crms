import { DashboardStats } from "@/components/admin/dashboard-stats"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here's an overview of your store's performance.
        </p>
      </div>

      <DashboardStats />
    </div>
  )
}
