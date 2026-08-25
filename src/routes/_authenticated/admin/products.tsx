import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProducts } from '@/lib/hooks'
import { Loader, Plus, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/admin/products')({ 
  component: ProductsPage,
})

function ProductsPage() {
  const { data: products, isLoading } = useProducts()
  const [search, setSearch] = useState('')

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-stone-900 text-white p-6" />

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-stone-900">Products</h2>
            <Link to="/admin/products/new">
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-amber-700" />
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-stone-100 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-stone-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filtered?.map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 text-sm text-stone-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-stone-900">₹{product.price}</td>
                      <td className="px-6 py-4 text-sm text-stone-900">{product.stock_quantity}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-stone-100 text-stone-800'
                        }`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
