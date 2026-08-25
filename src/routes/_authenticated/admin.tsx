import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'
import { LayoutDashboard, Box, Tags, Users, ShoppingCart, MessageSquare, Settings, LogOut } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/admin')({ 
  component: AdminDashboard,
})

function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    navigate({ to: '/' })
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Box, label: 'Products', href: '/admin/products' },
    { icon: Tags, label: 'Categories', href: '/admin/categories' },
    { icon: Users, label: 'Brands', href: '/admin/brands' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: MessageSquare, label: 'Enquiries', href: '/admin/enquiries' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-stone-900 text-white p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-amber-400">Vaishnavi</h1>
          <p className="text-sm text-stone-400">Admin Panel</p>
        </div>

        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-sm"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900 transition-colors text-sm text-red-300"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-6xl">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">Dashboard</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Products" value="175" trend="+12 this month" />
            <StatCard label="Active Products" value="168" trend="+5 active" />
            <StatCard label="Total Orders" value="0" trend="Pending processing" />
            <StatCard label="Enquiries" value="0" trend="Awaiting response" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admin/products/new">
              <Button className="w-full bg-amber-700 hover:bg-amber-800">
                + Add Product
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outline" className="w-full">
                Manage Categories
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full">
                Site Settings
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-700">
      <p className="text-stone-600 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-stone-900 mt-2">{value}</p>
      <p className="text-sm text-stone-500 mt-1">{trend}</p>
    </div>
  )
}
