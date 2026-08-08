import { PageHero } from '@/components/PageHero'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { Process } from '@/components/home/Process'
import { CTABand } from '@/components/home/CTABand'

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        crumb="Programs"
        title={<>Every body is different. <br /> <span className="text-gradient-accent">So is every program.</span></>}
        description="Three specialized programs, fully personalized to your body, equipment, schedule and goals after your free assessment."
      />
      <ProgramsSection />
      <Process />
      <CTABand />
    </>
  )
}
