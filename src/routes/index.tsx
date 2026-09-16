import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Calendar, Sparkles, MessageCircle, Gift, Award, Coins } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { BuilderWorkflowTabs } from '@/components/home/BuilderWorkflowTabs'
import { ArchitectureGrid } from '@/components/home/ArchitectureGrid'
import { ProgramSection } from '@/components/home/ProgramSection'
import { Pillars } from '@/components/home/Pillars'
import { Container } from '@/components/common/Container'
import { EventCard } from '@/components/events/EventCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Button } from '@/components/ui/button'
import { BuilderChipLogo } from '@/components/ui/BuilderChipLogo'
import { AwsSmileLogo } from '@/components/ui/AwsSmileLogo'
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
      <BuilderWorkflowTabs />
      <ArchitectureGrid />
      <ProgramSection />
      <Pillars />

      {/* Official Builder Rewards Section (Derived from Brand Image 1) */}
      <section className="py-16 border-b border-white/10 bg-[#FF9900] text-[#0A0E17]">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0A0E17]/80 flex items-center gap-2">
                <Gift className="w-4 h-4" /> [ AWS BUILDER CENTER REWARDS ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-[#0A0E17]">
                Introducing Student Rewards at USJ
              </h2>
              <p className="text-base sm:text-lg text-[#0A0E17]/90 font-sans max-w-2xl leading-relaxed">
                Unlock official AWS credits, premium Skill Builder subscriptions, and certification exam vouchers through our student community milestones.
              </p>

              {/* Reward Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-[#0A0E17] text-white space-y-1">
                  <div className="text-xs font-mono text-[#FF9900] font-bold">12 MONTHS</div>
                  <div className="text-sm font-bold font-display">Free Skill Builder Premium</div>
                </div>
                <div className="p-4 bg-[#0A0E17] text-white space-y-1">
                  <div className="text-xs font-mono text-[#FF9900] font-bold">UP TO $30</div>
                  <div className="text-sm font-bold font-display">AWS Cloud Credits</div>
                </div>
                <div className="p-4 bg-[#0A0E17] text-white space-y-1">
                  <div className="text-xs font-mono text-[#FF9900] font-bold">OFFICIAL VOUCHERS</div>
                  <div className="text-sm font-bold font-display">AWS Certification Exams</div>
                </div>
              </div>
            </div>

            {/* Right Anchored Brand Box */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 bg-[#0A0E17] text-white border border-[#0A0E17] space-y-4 max-w-xs w-full text-center">
                <div className="w-12 h-12 bg-[#FF9900] flex items-center justify-center mx-auto text-[#0A0E17]">
                  <BuilderChipLogo size={32} color="#0A0E17" />
                </div>
                <p className="text-xs font-mono text-slate-300 leading-snug">
                  AWS Student Builder Group at University of Sri Jayewardenepura
                </p>
                <Link to="/contact">
                  <Button variant="glow" size="sm" className="w-full font-mono text-xs">
                    Claim Student Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Upcoming Events Section */}
      <section className="py-20 bg-builder-grid-dark border-b border-white/10">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> [ WORKSHOPS & SPRINTS ]
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
                <Sparkles className="w-3.5 h-3.5" /> [ STUDENT ARCHITECTURES ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Built by USJ Students
              </h2>
              <p className="text-slate-300 text-sm font-sans">
                Explore cloud-native applications, AI assistants, and IoT systems engineered by our guild builders.
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

      {/* Official "FROM STUDENTS TO BUILDERS" Banner Callout (Derived from Brand Image 3) */}
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
                    [ COMMUNITY COHORT 2026 ]
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-[1.1]">
                  FROM STUDENTS <br />
                  <span className="text-[#FF9900]">TO BUILDERS.</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-xl font-sans">
                  Be part of our AWS Student Builder Group to learn, connect, and build together at the University of Sri Jayewardenepura.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="glow" size="md" className="font-mono text-xs">
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      Apply for Guild Membership
                    </Button>
                  </Link>
                  <a href={SITE_CONFIG.links.github} target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="md" className="font-mono text-xs border-white/10">
                      GitHub Repository
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
