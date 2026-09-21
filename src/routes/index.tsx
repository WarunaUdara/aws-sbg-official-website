import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { Pillars } from '@/components/home/Pillars'
import { LearningTracks } from '@/components/home/LearningTracks'
import { BuilderRewardsSection } from '@/components/home/BuilderRewardsSection'
import { ProgramSection } from '@/components/home/ProgramSection'
import { Container } from '@/components/common/Container'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { BuilderMosaic } from '@/components/common/BuilderMosaic'
import { ShapeGrid } from '@/components/ui/ShapeGrid'
import { FloatingCloudIcons } from '@/components/home/FloatingCloudIcons'
import { MOCK_EVENTS } from '@/features/events/data'
import { SITE_CONFIG } from '@/lib/constants'
import { createSeoMeta } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    createSeoMeta({
      path: '/',
    }),
  component: HomePage,
})

function HomePage() {
  const upcomingEvents = MOCK_EVENTS.filter((e) => e.status === 'upcoming').slice(0, 2)

  return (
    <div className="relative isolate flex flex-col gap-0 pb-20 bg-[#0D0D0D]">
      <FloatingCloudIcons targetId="builder-cta" />
      <Hero />
      <Stats />
      <Pillars />
      <LearningTracks />
      <BuilderRewardsSection />
      <ProgramSection />

      {/* Featured Upcoming Events Section */}
      <section className="py-20 bg-[#0D0D0D] border-b border-white/10">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Upcoming Workshops
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Upcoming Builder Sessions
              </h2>
              <p className="text-slate-200 text-base sm:text-lg font-sans">
                Hands-on, free cloud sessions led by certified student architects and AWS community leaders.
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline" size="md" className="font-mono text-xs border-white/20 hover:border-[#FF9900]">
                View All Events
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Connected Upcoming Sessions Grid matching LearningTracks & BuilderRewards */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-[#0D0D0D]">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                bordered={false}
                className="border-b md:border-b-0 md:border-r border-white/10"
              />
            ))}

            {/* Propose a Session / Community Workshop Callout */}
            <div className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#151515]/30 transition-colors group">
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                  <span className="text-[11px] font-mono font-bold text-[#FF9900] tracking-wider uppercase">
                    Call for Speakers
                  </span>
                  <div className="p-2 bg-[#0D0D0D] border border-white/10 text-[#FF9900] group-hover:border-[#FF9900] transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-[#FF9900] transition-colors">
                  Want to Lead or Host a Cloud Session?
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans mb-4">
                  We are 100% student-led. Share your cloud journey, architecture, or project with fellow USJ builders.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <Link to="/contact">
                  <Button variant="glow" size="sm" className="font-mono text-xs rounded-none">
                    Propose a Workshop
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Official "FROM STUDENTS TO BUILDERS" Banner Callout */}
      <section className="pt-16">
        <Container size="lg">
          <div className="relative overflow-hidden bg-[#0D0D0D] border border-white/10 p-8 sm:p-12 md:p-14">
            {/* Interactive ShapeGrid Animated Canvas Background */}
            <div className="absolute inset-0 pointer-events-auto opacity-50">
              <ShapeGrid
                shape="square"
                squareSize={36}
                direction="right"
                speed={0.3}
                borderColor="rgba(255, 255, 255, 0.08)"
                hoverFillColor="rgba(255, 153, 0, 0.22)"
                hoverTrailAmount={4}
                vignetteColor="#0D0D0D"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#FF9900]" />
                  <span className="text-xs font-mono text-[#FF9900] font-bold uppercase tracking-wider">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.15] text-balance">
                  Democratizing cloud education at USJ.
                </h2>
                <p className="text-slate-200 text-base sm:text-lg max-w-xl font-sans leading-relaxed text-pretty">
                  Practical cloud skills, official AWS certifications, and builder mentorship—100% free for all students.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="glow" size="md" className="font-mono text-xs">
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      Join Community
                    </Button>
                  </Link>
                  <a href={SITE_CONFIG.links.github} target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="md" className="font-mono text-xs border-white/10">
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right Mosaic Anchor */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <BuilderMosaic density="banner" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
