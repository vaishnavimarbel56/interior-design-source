import { createFileRoute } from '@tanstack/react-router'
import { useCategories, useProducts } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: Homepage,
})

function Homepage() {
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { data: products } = useProducts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-900">Vaishnavi Marble</div>
          <nav className="flex gap-6">
            <Link to="/products" className="text-sm hover:text-amber-700">
              Products
            </Link>
            <Link to="/contact" className="text-sm hover:text-amber-700">
              Contact
            </Link>
            <Link to="/cart" className="text-sm hover:text-amber-700">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-50 to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">
            Premium Marble, Tiles & Home Interior Solutions
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            Transform your home or commercial space with premium-quality marble, granite, tiles,
            sanitaryware, kitchen sinks, bathroom vanities and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-amber-700 hover:bg-amber-800">
                Explore Products
              </Button>
            </Link>
            <Link to="/bulk-enquiry">
              <Button size="lg" variant="outline">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Shop by Category</h2>
          {categoriesLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-amber-700" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-stone-200 rounded-lg p-6 hover:border-amber-700 hover:shadow-lg transition-all text-center cursor-pointer">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-700 transition-colors" />
                    <h3 className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products?.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-stone-200 hover:border-amber-700 hover:shadow-lg transition-all">
                  <div className="bg-stone-100 h-48 flex items-center justify-center">
                    <div className="text-stone-400 text-sm">Product Image</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 line-clamp-2 group-hover:text-amber-700">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-600 mt-1 line-clamp-2">
                      {product.short_description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-amber-700">
                          ₹{product.price}
                        </div>
                        {product.mrp && (
                          <div className="text-sm text-stone-500 line-through">
                            ₹{product.mrp}
                          </div>
                        )}
                      </div>
                      {product.discount_percentage > 0 && (
                        <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                          {product.discount_percentage}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Vaishnavi Marble</h3>
              <p className="text-stone-400 text-sm">
                Premium marble, tiles, sanitaryware and interior solutions in Kolkata.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link to="/products" className="hover:text-white">Products</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-stone-400 mb-2">📞 +91 93303 00408</p>
              <p className="text-sm text-stone-400 mb-2">💬 +91 70039 48297</p>
              <p className="text-sm text-stone-400">✉️ marblevaishnavi@gmail.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Address</h4>
              <p className="text-sm text-stone-400">
                Krishnapur Taruliya Main Road, Kolkata - 700102
              </p>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm text-stone-400">
            <p>© 2026 Vaishnavi Marble. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
