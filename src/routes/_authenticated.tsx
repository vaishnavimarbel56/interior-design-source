import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/_authenticated')({ 
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user

      if (!user) {
        navigate({ to: '/auth/login' })
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        navigate({ to: '/' })
        return
      }

      setIsAdmin(true)
    }

    checkAuth()
  }, [])

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-amber-700" />
      </div>
    )
  }

  return <Outlet />
}
