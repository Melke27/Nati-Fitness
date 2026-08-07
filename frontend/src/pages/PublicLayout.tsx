import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const NO_FOOTER = ['/login', '/register', '/onboarding', '/checkout', '/enroll']

export function PublicLayout() {
  const { pathname } = useLocation()
  const minimal = NO_FOOTER.some((p) => pathname.startsWith(p))

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className={cn('flex-1', minimal && 'min-h-screen')}>
        <Outlet />
      </main>
      {!minimal && <Footer />}
    </div>
  )
}
