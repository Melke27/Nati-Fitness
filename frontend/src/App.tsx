import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import { StickyCTA, BackToTop, ScrollProgress, Loader } from '@/components/layout/floating'
import { Chatbot } from '@/components/layout/Chatbot'
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
import Trainers from '@/pages/Trainers'
import TrainerDetail from '@/pages/TrainerDetail'
import Templates from '@/pages/Templates'
import Courses from '@/pages/Courses'
import Services from '@/pages/Services'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Onboarding from '@/pages/onboarding/Onboarding'
import Checkout from '@/pages/checkout/Checkout'
import CheckoutSuccess from '@/pages/checkout/CheckoutSuccess'
import DashboardLayout from '@/pages/dashboard/DashboardLayout'
import ClientOverview from '@/pages/dashboard/ClientOverview'
import ClientWorkouts from '@/pages/dashboard/ClientWorkouts'
import ClientNutrition from '@/pages/dashboard/ClientNutrition'
import ClientProgress from '@/pages/dashboard/ClientProgress'
import ClientMessages from '@/pages/dashboard/ClientMessages'
import ClientCalendar from '@/pages/dashboard/ClientCalendar'
import ClientResources from '@/pages/dashboard/ClientResources'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminOverview from '@/pages/admin/AdminOverview'
import AdminMembers from '@/pages/admin/AdminMembers'
import AdminClientDetail from '@/pages/admin/AdminClientDetail'
import AdminPrograms from '@/pages/admin/AdminPrograms'
import AdminAssign from '@/pages/admin/AdminAssign'
import AdminContent from '@/pages/admin/AdminContent'
import AdminPayments from '@/pages/admin/AdminPayments'
import AdminWorkouts from '@/pages/admin/AdminWorkouts'
import AdminExercises from '@/pages/admin/AdminExercises'
import AdminNutrition from '@/pages/admin/AdminNutrition'
import AdminProgress from '@/pages/admin/AdminProgress'
import AdminAssessments from '@/pages/admin/AdminAssessments'
import AdminGoals from '@/pages/admin/AdminGoals'
import AdminLiveCoaching from '@/pages/admin/AdminLiveCoaching'
import AdminAttendance from '@/pages/admin/AdminAttendance'
import AdminSchedule from '@/pages/admin/AdminSchedule'
import AdminMessaging from '@/pages/admin/AdminMessaging'
import AdminReports from '@/pages/admin/AdminReports'
import AdminFiles from '@/pages/admin/AdminFiles'
import AdminNotifications from '@/pages/admin/AdminNotifications'
import AdminProfile from '@/pages/admin/AdminProfile'
import AdminSettings from '@/pages/admin/AdminSettings'
import AdminAI from '@/pages/admin/AdminAI'

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
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/trainers/:slug" element={<TrainerDetail />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:slug" element={<ProgramDetail />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/templates" element={<Templates />} />
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
              </Route>

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<ClientOverview />} />
                <Route path="workouts" element={<ClientWorkouts />} />
                <Route path="nutrition" element={<ClientNutrition />} />
                <Route path="progress" element={<ClientProgress />} />
                <Route path="messages" element={<ClientMessages />} />
                <Route path="calendar" element={<ClientCalendar />} />
                <Route path="resources" element={<ClientResources />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="members" element={<AdminMembers />} />
                <Route path="members/:id" element={<AdminClientDetail />} />
                <Route path="workouts" element={<AdminWorkouts />} />
                <Route path="exercises" element={<AdminExercises />} />
                <Route path="nutrition" element={<AdminNutrition />} />
                <Route path="progress" element={<AdminProgress />} />
                <Route path="assessments" element={<AdminAssessments />} />
                <Route path="goals" element={<AdminGoals />} />
                <Route path="live" element={<AdminLiveCoaching />} />
                <Route path="attendance" element={<AdminAttendance />} />
                <Route path="schedule" element={<AdminSchedule />} />
                <Route path="messaging" element={<AdminMessaging />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="files" element={<AdminFiles />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="ai" element={<AdminAI />} />
                <Route path="programs" element={<AdminPrograms />} />
                <Route path="assign" element={<AdminAssign />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="payments" element={<AdminPayments />} />
              </Route>

              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <StickyCTA />
        <BackToTop />
        <Chatbot />
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
