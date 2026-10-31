"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Heart } from "lucide-react"

interface CartItemProps {
  item: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    color: string
    size: string
    quantity: number
    inStock: boolean
    maxQuantity: number
  }
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onMoveToWishlist: (id: number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: string) => {
    setIsUpdating(true)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API call
    onUpdateQuantity(item.id, Number.parseInt(newQuantity))
    setIsUpdating(false)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link href={`/product/${item.id}`}>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium hover:underline">{item.name}</h3>
                </Link>
                <div className="text-sm text-muted-foreground mt-1">
                  Color: {item.color} • Size: {item.size}
                </div>
                {!item.inStock && (
                  <Badge variant="destructive" className="text-xs mt-2">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold">${item.price}</div>
                {item.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">${item.originalPrice}</div>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Qty:</span>
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={handleQuantityChange}
                    disabled={isUpdating || !item.inStock}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(Math.min(10, item.maxQuantity))].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isUpdating && <div className="text-sm text-muted-foreground">Updating...</div>}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveToWishlist(item.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
