"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Edit, Trash2, Eye, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "1",
    name: "Silk Midi Dress",
    sku: "SMD-001",
    category: "Dresses",
    price: 299.99,
    stock: 45,
    status: "Active",
    image: "/elegant-silk-midi-dress.jpg",
  },
  {
    id: "2",
    name: "Cashmere Sweater",
    sku: "CS-002",
    category: "Tops",
    price: 199.99,
    stock: 23,
    status: "Active",
    image: "/elegant-silk-blouse.jpg",
  },
  {
    id: "3",
    name: "Leather Handbag",
    sku: "LH-003",
    category: "Accessories",
    price: 449.99,
    stock: 12,
    status: "Low Stock",
    image: "/elegant-silk-midi-dress.jpg",
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    sku: "DS-004",
    category: "Accessories",
    price: 159.99,
    stock: 0,
    status: "Out of Stock",
    image: "/elegant-silk-blouse.jpg",
  },
  {
    id: "5",
    name: "Premium Sneakers",
    sku: "PS-005",
    category: "Shoes",
    price: 129.99,
    stock: 67,
    status: "Active",
    image: "/tailored-trousers.jpg",
  },
]

export function ProductTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "Active"
                        ? "default"
                        : product.status === "Low Stock"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/product/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Product
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate Product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
