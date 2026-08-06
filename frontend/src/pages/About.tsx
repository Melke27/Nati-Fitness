import { PageHero } from '@/components/PageHero'
import { About } from '@/components/home/About'
import { PlatformStats } from '@/components/home/PlatformStats'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Process } from '@/components/home/Process'
import { Gallery } from '@/components/home/Gallery'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABand } from '@/components/home/CTABand'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        crumb="About"
        title={<>The coach, the mission &amp; the <span className="text-gradient-accent">method</span></>}
        description="Discipline in the gym. Science in the plan. Care in the coaching. Here's who Coach Nati is and how you get results."
      />
      <About />
      <PlatformStats />
      <WhyChoose />
      <Process />
      <Gallery />
      <Testimonials />
      <CTABand />
    </>
  )
}
