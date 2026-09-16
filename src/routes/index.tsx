import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Calendar, Sparkles, MessageCircle } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { Pillars } from '@/components/home/Pillars'
import { CloudArchitectureVisualizer } from '@/components/home/CloudArchitectureVisualizer'
import { LearningTracks } from '@/components/home/LearningTracks'
import { BuilderRewardsSection } from '@/components/home/BuilderRewardsSection'
import { ProgramSection } from '@/components/home/ProgramSection'
import { Container } from '@/components/common/Container'
import { EventCard } from '@/components/events/EventCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Button } from '@/components/ui/button'
import { BuilderMosaic } from '@/components/common/BuilderMosaic'
import { ShapeGrid } from '@/components/ui/ShapeGrid'
import { MOCK_EVENTS } from '@/features/events/data'
import { MOCK_PROJECTS } from '@/features/projects/data'
import { SITE_CONFIG } from '@/lib/constants'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const upcomingEvents = MOCK_EVENTS.filter((e) => e.status === 'upcoming').slice(0, 2)
  const featuredProjects = MOCK_PROJECTS.slice(0, 2)

  return (
    <div className="flex flex-col gap-0 pb-20 bg-[#0A0E17]">
      <Hero />
      <Stats />
      <Pillars />
      <CloudArchitectureVisualizer />
      <LearningTracks />
      <BuilderRewardsSection />
      <ProgramSection />

      {/* Featured Upcoming Events Section */}
      <section className="py-20 bg-builder-grid-dark border-b border-white/10">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Upcoming Workshops
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Upcoming Builder Sessions
              </h2>
              <p className="text-slate-300 text-sm font-sans">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* Student Builder Showcase Section */}
      <section className="py-20 bg-[#0A0E17] border-b border-white/10">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Student Projects
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Built by USJ Students
              </h2>
              <p className="text-slate-300 text-sm font-sans">
                Explore cloud-native applications, AI assistants, and IoT systems engineered by USJ student builders.
              </p>
            </div>
            <Link to="/projects">
              <Button variant="outline" size="md" className="font-mono text-xs border-white/20 hover:border-[#FF9900]">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Official "FROM STUDENTS TO BUILDERS" Banner Callout */}
      <section className="pt-16">
        <Container size="lg">
          <div className="relative overflow-hidden bg-[#161F2E] border border-white/10 p-8 sm:p-12 md:p-14">
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
                vignetteColor="#161F2E"
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.2] text-balance">
                  “Democratizing cloud education at USJ—building practical skills, fostering community, and preparing students for the future of technology.”
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans leading-relaxed text-pretty">
                  We empower USJ students to build cloud-native applications, earn AWS certifications, and gain real-world developer experience through free hands-on workshops and mentorship.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="glow" size="md" className="font-mono text-xs">
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      Join the Community
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
