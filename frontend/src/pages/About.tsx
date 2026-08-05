import { PageHero } from '@/components/PageHero'
import { About } from '@/components/home/About'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABand } from '@/components/home/CTABand'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        crumb="About"
        title={<>Meet the coach behind the <span className="text-gradient-accent">transformations</span></>}
        description="Discipline in the gym. Science in the plan. Care in the coaching."
      />
      <About />
      <WhyChoose />
      <Testimonials />
      <CTABand />
    </>
  )
}
