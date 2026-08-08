import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { StickyCTA, BackToTop, ScrollProgress, Loader } from '@/components/layout/floating'
import { Chatbot } from '@/components/layout/Chatbot'
import { PlanFinderModal } from '@/components/planfinder/PlanFinderModal'
import { PublicLayout } from '@/pages/PublicLayout'
import Home from '@/pages/Home'
import Programs from '@/pages/Programs'
import ProgramDetail from '@/pages/ProgramDetail'
import Pricing from '@/pages/Pricing'
import Transformations from '@/pages/Transformations'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import About from '@/pages/About'
import Courses from '@/pages/Courses'
import Services from '@/pages/Services'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Onboarding from '@/pages/onboarding/Onboarding'
import Checkout from '@/pages/checkout/Checkout'
import CheckoutSuccess from '@/pages/checkout/CheckoutSuccess'
import PlanEnrollment from '@/pages/enroll/PlanEnrollment'
import DashboardLayout from '@/pages/dashboard/DashboardLayout'
import ClientOverview from '@/pages/dashboard/ClientOverview'
import ClientWorkouts from '@/pages/dashboard/ClientWorkouts'
import ClientNutrition from '@/pages/dashboard/ClientNutrition'
import ClientProgress from '@/pages/dashboard/ClientProgress'
import ClientMessages from '@/pages/dashboard/ClientMessages'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminOverview from '@/pages/admin/AdminOverview'
import AdminMembers from '@/pages/admin/AdminMembers'
import AdminClientDetail from '@/pages/admin/AdminClientDetail'
import AdminPayments from '@/pages/admin/AdminPayments'
import AdminProgress from '@/pages/admin/AdminProgress'
import AdminSchedule from '@/pages/admin/AdminSchedule'
import AdminMessaging from '@/pages/admin/AdminMessaging'
import AdminNotifications from '@/pages/admin/AdminNotifications'

function Shell() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider>
      <ToastProvider>
        <ScrollProgress />
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/services" element={<Services />} />
                <Route path="/transformations" element={<Transformations />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/enroll" element={<PlanEnrollment />} />
              </Route>

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<ClientOverview />} />
                <Route path="workouts" element={<ClientWorkouts />} />
                <Route path="nutrition" element={<ClientNutrition />} />
                <Route path="progress" element={<ClientProgress />} />
                <Route path="messages" element={<ClientMessages />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="members" element={<AdminMembers />} />
                <Route path="members/:id" element={<AdminClientDetail />} />
                <Route path="progress" element={<AdminProgress />} />
                <Route path="schedule" element={<AdminSchedule />} />
                <Route path="messaging" element={<AdminMessaging />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="payments" element={<AdminPayments />} />
              </Route>

              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <StickyCTA />
        <BackToTop />
        <Chatbot />
        <PlanFinderModal />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
