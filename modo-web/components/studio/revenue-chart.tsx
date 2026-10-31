"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { month: "May", revenue: 18400, orders: 42 },
  { month: "Jun", revenue: 22100, orders: 54 },
  { month: "Jul", revenue: 29800, orders: 68 },
  { month: "Aug", revenue: 34500, orders: 81 },
  { month: "Sep", revenue: 41200, orders: 96 },
  { month: "Oct", revenue: 49800, orders: 114 },
]

export function RevenueChart() {
  return (
    <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            Revenue Performance
          </h3>
          <p className="text-xs text-muted-foreground">
            Trailing 6 months gross revenue and volume
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/15 text-secondary">
          +32% Period Growth
        </span>
      </div>

      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="clayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "1rem",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#clayGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart

