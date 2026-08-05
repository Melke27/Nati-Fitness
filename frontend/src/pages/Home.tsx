import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { About } from '@/components/home/About'
import { WhyChoose } from '@/components/home/WhyChoose'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { Transformations } from '@/components/home/Transformations'
import { Process } from '@/components/home/Process'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { PricingSection } from '@/components/home/PricingSection'
import { BMICalculator } from '@/components/home/BMICalculator'
import { Nutrition } from '@/components/home/Nutrition'
import { BlogPreview } from '@/components/home/BlogPreview'
import { FAQSection } from '@/components/home/FAQSection'
import { ContactSection } from '@/components/home/ContactSection'
import { CTABand } from '@/components/home/CTABand'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <About />
      <WhyChoose />
      <ProgramsSection limit={6} />
      <Transformations />
      <Process />
      <ServicesSection />
      <Gallery />
      <Testimonials />
      <PricingSection />
      <BMICalculator />
      <Nutrition />
      <BlogPreview />
      <FAQSection />
      <ContactSection />
      <CTABand />
    </>
  )
}
