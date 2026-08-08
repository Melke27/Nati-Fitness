import { Hero } from '@/components/home/Hero'
import { AboutCoach } from '@/components/home/AboutCoach'
import { Process } from '@/components/home/Process'
import { ProgramsSection } from '@/components/home/ProgramsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCoach />
      <Process />
      <ProgramsSection />
    </>
  )
}