import { createFileRoute, Link } from '@tanstack/react-router'
import { useProducts, useCategories } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Loader, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/hooks'
import { toast } from 'sonner'

export const Route = createFileRoute('/products')({ 
  component: ProductsPage,
})

function ProductsPage() {
  const { data: products, isLoading } = useProducts()
  const { data: categories } = useCategories()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = selectedCategory
    ? products?.filter(p => p.category_id === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-amber-900">Vaishnavi Marble</Link>
          <nav className="flex gap-6">
            <Link to="/products" className="text-sm font-semibold text-amber-700">Products</Link>
            <Link to="/contact" className="text-sm hover:text-amber-700">Contact</Link>
            <Link to="/cart" className="text-sm hover:text-amber-700">Cart</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">All Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 rounded-lg p-6">
              <h3 className="font-semibold text-stone-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === null
                      ? 'bg-amber-700 text-white'
                      : 'hover:bg-stone-200'
                  }`}
                >
                  All Products
                </button>
                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === cat.id
                        ? 'bg-amber-700 text-white'
                        : 'hover:bg-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-amber-700" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered?.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-amber-700 hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="bg-stone-100 h-40 flex items-center justify-center relative">
                        {product.discount_percentage > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            {Math.round(product.discount_percentage)}% OFF
                          </div>
                        )}
                        <div className="text-stone-400 text-sm">Product Image</div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-stone-900 line-clamp-2 group-hover:text-amber-700">
                            {product.name}
                          </h3>
                          <p className="text-sm text-stone-600 mt-1 line-clamp-2">
                            {product.short_description}
                          </p>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex gap-2">
                            <div>
                              <div className="text-lg font-bold text-amber-700">₹{product.price}</div>
                              {product.mrp && (
                                <div className="text-sm text-stone-500 line-through">₹{product.mrp}</div>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-amber-700 hover:bg-amber-800"
                            onClick={(e) => {
                              e.preventDefault()
                              addItem({
                                product_id: product.id,
                                product_name: product.name,
                                quantity: 1,
                                price: product.price,
                                image_url: null,
                              })
                              toast.success('Added to cart')
                            }}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
