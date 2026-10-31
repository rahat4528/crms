import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const customerGroups = [
  {
    id: "1",
    name: "VIP Customers",
    description: "High-value customers with special privileges",
    customers: 156,
    discount: "15%",
    minSpent: "$1,000",
    benefits: ["Free shipping", "Early access", "Priority support"],
  },
  {
    id: "2",
    name: "Regular Customers",
    description: "Standard customer group",
    customers: 1089,
    discount: "5%",
    minSpent: "$0",
    benefits: ["Standard shipping", "Regular promotions"],
  },
  {
    id: "3",
    name: "Wholesale",
    description: "Business customers with bulk pricing",
    customers: 23,
    discount: "25%",
    minSpent: "$5,000",
    benefits: ["Bulk pricing", "Net 30 terms", "Dedicated support"],
  },
  {
    id: "4",
    name: "New Customers",
    description: "Recently registered customers",
    customers: 89,
    discount: "10%",
    minSpent: "$0",
    benefits: ["Welcome discount", "Onboarding emails"],
  },
]

export default function CustomerGroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Groups</h1>
          <p className="text-muted-foreground">
            Organize customers into groups with different privileges and discounts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search groups..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {customerGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Group
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{group.customers}</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{group.discount}</div>
                  <div className="text-sm text-muted-foreground">Discount</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{group.minSpent}</div>
                  <div className="text-sm text-muted-foreground">Min Spent</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-1">
                  {group.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
