import { Hero } from '@/components/home/Hero'
import { AboutCoach } from '@/components/home/AboutCoach'
import { PartnersSection } from '@/components/home/PartnersSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCoach />
      <PartnersSection />
      <ProgramsSection limit={6} />
      <ReviewsSection />
    </>
  )
}