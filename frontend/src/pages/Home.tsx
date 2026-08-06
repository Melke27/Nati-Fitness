import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { Transformations } from '@/components/home/Transformations'
import { Testimonials } from '@/components/home/Testimonials'
import { PricingSection } from '@/components/home/PricingSection'
import { CTABand } from '@/components/home/CTABand'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProgramsSection limit={6} />
      <Transformations />
      <Testimonials />
      <PricingSection />
      <CTABand />
    </>
  )
}
