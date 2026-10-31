"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface FilterProps {
  onFiltersChange: (filters: any) => void
  activeFilters: any
}

const filterOptions = {
  categories: ["Dresses", "Tops", "Bottoms", "Shoes", "Accessories", "Outerwear"],
  brands: ["Luxe", "Premium", "Elite", "Classic", "Modern", "Timeless"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Black", "White", "Gray", "Navy", "Brown", "Beige", "Red", "Blue"],
  materials: ["Cotton", "Silk", "Wool", "Cashmere", "Leather", "Linen", "Polyester"],
}

export function ProductFilters({ onFiltersChange, activeFilters }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const handleFilterChange = (type: string, value: any) => {
    const newFilters = { ...activeFilters }

    switch (type) {
      case "price":
        setPriceRange(value)
        newFilters.priceRange = value
        break
      case "category":
        const newCategories = selectedCategories.includes(value)
          ? selectedCategories.filter((c) => c !== value)
          : [...selectedCategories, value]
        setSelectedCategories(newCategories)
        newFilters.categories = newCategories
        break
      case "brand":
        const newBrands = selectedBrands.includes(value)
          ? selectedBrands.filter((b) => b !== value)
          : [...selectedBrands, value]
        setSelectedBrands(newBrands)
        newFilters.brands = newBrands
        break
      case "size":
        const newSizes = selectedSizes.includes(value)
          ? selectedSizes.filter((s) => s !== value)
          : [...selectedSizes, value]
        setSelectedSizes(newSizes)
        newFilters.sizes = newSizes
        break
      case "color":
        const newColors = selectedColors.includes(value)
          ? selectedColors.filter((c) => c !== value)
          : [...selectedColors, value]
        setSelectedColors(newColors)
        newFilters.colors = newColors
        break
      case "material":
        const newMaterials = selectedMaterials.includes(value)
          ? selectedMaterials.filter((m) => m !== value)
          : [...selectedMaterials, value]
        setSelectedMaterials(newMaterials)
        newFilters.materials = newMaterials
        break
      case "inStock":
        setInStockOnly(value)
        newFilters.inStockOnly = value
        break
    }

    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedMaterials([])
    setInStockOnly(false)
    onFiltersChange({})
  }

  const getActiveFilterCount = () => {
    return (
      selectedCategories.length +
      selectedBrands.length +
      selectedSizes.length +
      selectedColors.length +
      selectedMaterials.length +
      (inStockOnly ? 1 : 0)
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All ({getActiveFilterCount()})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Active Filters</Label>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("category", category)} />
              </Badge>
            ))}
            {selectedBrands.map((brand) => (
              <Badge key={brand} variant="secondary" className="text-xs">
                {brand}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("brand", brand)} />
              </Badge>
            ))}
            {selectedSizes.map((size) => (
              <Badge key={size} variant="secondary" className="text-xs">
                {size}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("size", size)} />
              </Badge>
            ))}
            {selectedColors.map((color) => (
              <Badge key={color} variant="secondary" className="text-xs">
                {color}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("color", color)} />
              </Badge>
            ))}
            {selectedMaterials.map((material) => (
              <Badge key={material} variant="secondary" className="text-xs">
                {material}
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("material", material)} />
              </Badge>
            ))}
            {inStockOnly && (
              <Badge variant="secondary" className="text-xs">
                In Stock Only
                <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("inStock", false)} />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => handleFilterChange("price", value)}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Category</Label>
        <div className="space-y-2">
          {filterOptions.categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleFilterChange("category", category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Brand</Label>
        <div className="space-y-2">
          {filterOptions.brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleFilterChange("brand", brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Size</Label>
        <div className="grid grid-cols-3 gap-2">
          {filterOptions.sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleFilterChange("size", size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Color</Label>
        <div className="space-y-2">
          {filterOptions.colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleFilterChange("color", color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Material</Label>
        <div className="space-y-2">
          {filterOptions.materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => handleFilterChange("material", material)}
              />
              <Label htmlFor={`material-${material}`} className="text-sm font-normal cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Availability</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            In stock only
          </Label>
        </div>
      </div>
    </div>
  )
}
