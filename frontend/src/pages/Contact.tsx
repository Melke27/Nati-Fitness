import { PageHero } from '@/components/PageHero'
import { ContactSection } from '@/components/home/ContactSection'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumb="Contact"
        title={<>Let's build your <span className="text-gradient-accent">game plan</span></>}
        description="Book a free 15-minute consultation and walk away with clear next steps — whether we train together or not."
      />
      <ContactSection showHeading={false} />
    </>
  )
}