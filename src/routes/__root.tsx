import { RootComponent, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { Toaster } from '@/components/ui/sonner'

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Outlet />
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})

const Outlet = () => <div />