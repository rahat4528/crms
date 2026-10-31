"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload } from "lucide-react"

interface ProductFormProps {
  product?: any
  isEditing?: boolean
}

export function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const [variants, setVariants] = useState([
    { size: "S", color: "Black", sku: "SMD-001-S-BLK", price: 299.99, stock: 10 },
    { size: "M", color: "Black", sku: "SMD-001-M-BLK", price: 299.99, stock: 15 },
    { size: "L", color: "Navy", sku: "SMD-001-L-NAV", price: 299.99, stock: 20 },
  ])

  const [tags, setTags] = useState(["silk", "dress", "elegant", "formal"])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", sku: "", price: 0, stock: 0 }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" defaultValue={product?.name || "Silk Midi Dress"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                defaultValue={
                  product?.description ||
                  "Elegant silk midi dress perfect for formal occasions. Made from premium silk with a flattering silhouette."
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" defaultValue={product?.sku || "SMD-001"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" defaultValue={product?.barcode || "123456789012"} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={product?.category || "dresses"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" defaultValue={product?.price || "299.99"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Compare at Price</Label>
                <Input id="comparePrice" type="number" step="0.01" defaultValue={product?.comparePrice || "399.99"} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Cost per Item</Label>
                <Input id="cost" type="number" step="0.01" defaultValue={product?.cost || "150.00"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profit">Profit</Label>
                <Input id="profit" value="149.99" disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" defaultValue={product?.stock || "45"} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lowStock">Low Stock Alert</Label>
              <Input id="lowStock" type="number" defaultValue={product?.lowStock || "10"} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="trackQuantity" defaultChecked />
              <Label htmlFor="trackQuantity">Track quantity</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="allowBackorder" />
              <Label htmlFor="allowBackorder">Allow customers to purchase when out of stock</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <div className="mt-4">
              <Button variant="outline">Upload Images</Button>
              <p className="text-sm text-muted-foreground mt-2">Drag and drop images here, or click to browse</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Product Variants
            <Button type="button" variant="outline" size="sm" onClick={addVariant}>
              <Plus className="h-4 w-4 mr-2" />
              Add Variant
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select defaultValue={variant.size}>
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input defaultValue={variant.color} />
                </div>
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input defaultValue={variant.sku} />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input type="number" step="0.01" defaultValue={variant.price} />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input type="number" defaultValue={variant.stock} />
                </div>
                <Button type="button" variant="outline" size="icon" onClick={() => removeVariant(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO & Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>SEO & Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" defaultValue={product?.metaTitle || "Elegant Silk Midi Dress - Premium Fashion"} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              rows={3}
              defaultValue={
                product?.metaDescription ||
                "Discover our elegant silk midi dress, perfect for formal occasions. Premium quality silk with flattering silhouette."
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlHandle">URL Handle</Label>
            <Input id="urlHandle" defaultValue={product?.urlHandle || "silk-midi-dress"} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="visible" defaultChecked />
            <Label htmlFor="visible">Visible on online store</Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button type="submit" size="lg">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" size="lg">
          Save as Draft
        </Button>
        <Button type="button" variant="ghost" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  )
}
