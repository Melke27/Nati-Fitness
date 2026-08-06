import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { AboutCoach } from '@/components/home/AboutCoach'
import { PartnersSection } from '@/components/home/PartnersSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { Transformations } from '@/components/home/Transformations'
import { ReviewsSection } from '@/components/home/ReviewsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutCoach />
      <PartnersSection />
      <ProgramsSection limit={6} />
      <Transformations />
      <ReviewsSection />
    </>
  )
}