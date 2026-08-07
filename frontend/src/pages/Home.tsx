import { Hero } from '@/components/home/Hero'
import { AboutCoach } from '@/components/home/AboutCoach'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { PlanFinder } from '@/components/home/PlanFinder'
import { ReviewsSection } from '@/components/home/ReviewsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <PlanFinder />
      <AboutCoach />
      <ProgramsSection limit={6} />
      <ServicesSection />
      <ReviewsSection />
    </>
  )
}