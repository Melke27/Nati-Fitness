import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { PartnersSection } from '@/components/home/PartnersSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { PlatformStats } from '@/components/home/PlatformStats'
import { Transformations } from '@/components/home/Transformations'
import { PlanFinder } from '@/components/home/PlanFinder'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { Newsletter } from '@/components/home/Newsletter'
import { PlatformCTA } from '@/components/home/PlatformCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PartnersSection />
      <ProgramsSection limit={6} />
      <PlatformStats />
      <PlanFinder />
      <Transformations />
      <ReviewsSection />
      <div className="section-padding bg-surface-subtle/40">
        <div className="container-shell">
          <Newsletter />
        </div>
      </div>
      <PlatformCTA />
    </>
  )
}