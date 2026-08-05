import { PageHero } from '@/components/PageHero'
import { FAQSection } from '@/components/home/FAQSection'
import { ContactSection } from '@/components/home/ContactSection'
import { CTABand } from '@/components/home/CTABand'

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        crumb="FAQ"
        title={<>Answers to your <span className="text-gradient-accent">questions</span></>}
        description="Everything about coaching, programs, nutrition and billing — answered honestly."
      />
      <FAQSection />
      <ContactSection />
      <CTABand />
    </>
  )
}
