import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { About } from '@/components/home/About'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Transformations } from '@/components/home/Transformations'
import { Process } from '@/components/home/Process'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { PricingSection } from '@/components/home/PricingSection'
import { CTABand } from '@/components/home/CTABand'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <ProgramsSection limit={6} />
      <ServicesSection />
      <WhyChoose />
      <Transformations />
      <Process />
      <Gallery />
      <Testimonials />
      <PricingSection />
      <CTABand />
    </>
  )
}
