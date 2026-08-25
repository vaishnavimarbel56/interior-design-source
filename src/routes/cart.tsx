import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useCart } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Loader, Trash2, Plus, Minus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useCreateOrder } from '@/lib/hooks'
import { toast } from 'sonner'

export const Route = createFileRoute('/cart')({ 
  component: CartPage,
})

function CartPage() {
  const navigate = useNavigate()
  const { cart, removeItem, updateQuantity, total, clearCart } = useCart()
  const { mutate: createOrder, isPending } = useCreateOrder()
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  })

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      toast.error('Cart is empty')
      return
    }

    createOrder(
      {
        ...formData,
        total_amount: total,
        status: 'pending',
      },
      {
        onSuccess: () => {
          toast.success('Order created successfully!')
          clearCart()
          navigate({ to: '/' })
        },
        onError: (error: any) => {
          toast.error(error.message || 'Failed to create order')
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-amber-900">Vaishnavi Marble</Link>
          <nav className="flex gap-6">
            <Link to="/products" className="text-sm hover:text-amber-700">Products</Link>
            <Link to="/contact" className="text-sm hover:text-amber-700">Contact</Link>
            <Link to="/cart" className="text-sm font-semibold text-amber-700">Cart</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 mb-4">Your cart is empty</p>
            <Link to="/products">
              <Button className="bg-amber-700 hover:bg-amber-800">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.product_id} className="bg-stone-50 p-4 rounded-lg border border-stone-200 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900">{item.product_name}</h3>
                    <p className="text-amber-700 font-bold mt-2">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 mr-4">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="p-1 hover:bg-stone-200 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-1 hover:bg-stone-200 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout */}
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 h-fit">
              <h3 className="font-bold text-stone-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 pb-4 border-b border-stone-200">
                {cart.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-stone-600">{item.product_name} x{item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total:</span>
                <span className="text-amber-700">₹{total}</span>
              </div>

              {!showCheckout ? (
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-3">
                  <Input
                    placeholder="Full Name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isPending ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
