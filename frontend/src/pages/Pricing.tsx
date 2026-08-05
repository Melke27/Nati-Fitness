import { PageHero } from '@/components/PageHero'
import { PricingSection } from '@/components/home/PricingSection'
import { Testimonials } from '@/components/home/Testimonials'
import { FAQSection } from '@/components/home/FAQSection'
import { CTABand } from '@/components/home/CTABand'

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        crumb="Pricing"
        title={<>Invest in the <span className="text-gradient-accent">strongest</span> version of you</>}
        description="Transparent pricing, no hidden fees. Pick a plan, complete your assessment, and start training within 24 hours."
      />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <CTABand />
    </>
  )
}
