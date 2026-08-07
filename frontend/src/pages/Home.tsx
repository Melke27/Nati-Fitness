import { Hero } from '@/components/home/Hero'
import { AboutCoach } from '@/components/home/AboutCoach'
import { PartnersSection } from '@/components/home/PartnersSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { PlanFinder } from '@/components/home/PlanFinder'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCoach />
      <PartnersSection />
      <PlanFinder />
      <ProgramsSection limit={6} />
      <ServicesSection />
      <ReviewsSection />
    </>
  )
}