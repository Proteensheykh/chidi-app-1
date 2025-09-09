"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreVertical, Package, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Badge } from "@/features/shared/ui/badge"
import { Checkbox } from "@/features/shared/ui/checkbox"

interface CatalogTabProps {
  products: any[]
  onAddProduct: () => void
  onEditProduct: (product: any) => void
  onViewProduct: (product: any) => void
  onBulkExport: () => void
}

export function CatalogTab({ products, onAddProduct, onEditProduct, onViewProduct, onBulkExport }: CatalogTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const categories = ["all", "electronics", "clothing", "accessories", "home"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "destructive", icon: AlertTriangle }
    if (stock <= 5) return { label: "Low Stock", color: "warning", icon: AlertTriangle }
    return { label: "In Stock", color: "success", icon: CheckCircle }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={onAddProduct}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {showFilters && (
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2 mt-3 p-2 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium">{selectedProducts.length} selected</span>
            <Button size="sm" variant="outline" onClick={onBulkExport}>
              Export Selected
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock)
            const StockIcon = stockStatus.icon

            return (
              <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                      className="bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditProduct(product)}
                      className="bg-white/80 backdrop-blur-sm h-8 w-8 p-0"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div
                    className="aspect-square bg-muted flex items-center justify-center cursor-pointer"
                    onClick={() => onViewProduct(product)}
                  >
                    {product.image ? (
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-2">${product.price}</p>

                  <div className="flex items-center justify-between">
                    <Badge variant={stockStatus.color as any} className="text-xs">
                      <StockIcon className="w-3 h-3 mr-1" />
                      {product.stock}
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search" : "Start by adding your first product"}
            </p>
            <Button onClick={onAddProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
