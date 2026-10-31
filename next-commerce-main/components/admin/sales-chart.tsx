"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const salesData = [
  { month: "Jan", sales: 45000, orders: 120, customers: 89 },
  { month: "Feb", sales: 52000, orders: 145, customers: 102 },
  { month: "Mar", sales: 48000, orders: 132, customers: 95 },
  { month: "Apr", sales: 61000, orders: 168, customers: 118 },
  { month: "May", sales: 55000, orders: 152, customers: 108 },
  { month: "Jun", sales: 67000, orders: 185, customers: 134 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-3))",
  },
}

interface SalesChartProps {
  type: "area" | "bar" | "line"
  dataKey: "sales" | "orders" | "customers"
  title: string
  description: string
}

export function SalesChart({ type, dataKey, title, description }: SalesChartProps) {
  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={chartConfig[dataKey].color}
              fill={chartConfig[dataKey].color}
              fillOpacity={0.2}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={dataKey} fill={chartConfig[dataKey].color} />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey={dataKey} stroke={chartConfig[dataKey].color} strokeWidth={2} />
          </LineChart>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
