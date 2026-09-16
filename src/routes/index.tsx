import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Calendar, Sparkles, MessageCircle } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { Pillars } from '@/components/home/Pillars'
import { Container } from '@/components/common/Container'
import { EventCard } from '@/components/events/EventCard'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Button } from '@/components/ui/button'
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
    <div className="flex flex-col gap-0 pb-20">
      <Hero />
      <Stats />
      <Pillars />

      {/* Featured Upcoming Events Section */}
      <section className="py-20 bg-[#0b0f19]">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Upcoming Sessions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Workshops & Bootcamps
              </h2>
              <p className="text-slate-400 text-sm">
                Practical, free learning sessions led by student builders and AWS industry experts.
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline" size="md">
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
      <section className="py-20 border-t border-slate-900 bg-slate-950/60">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Student Innovations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Built by USJ Students
              </h2>
              <p className="text-slate-400 text-sm">
                Discover real cloud-native applications, AI assistants, and IoT systems built by our guild members.
              </p>
            </div>
            <Link to="/projects">
              <Button variant="outline" size="md">
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

      {/* Community Join CTA Banner */}
      <section className="pt-16">
        <Container size="lg">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e293b] border border-[#FF9900]/30 p-8 sm:p-12 md:p-16 text-center space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none" />

            <span className="inline-block px-3 py-1 rounded-full bg-[#FF9900]/20 text-[#FF9900] text-xs font-bold tracking-wider uppercase">
              Join 350+ USJ Student Builders
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
              Ready to Start Your <span className="aws-gradient-text">AWS Cloud Journey?</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Whether you are completely new to cloud computing or already building production workloads,
              AWS SBG USJ is your launching pad. Free workshops, exam guidance, and supportive peers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button variant="glow" size="lg">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Become a Member
                </Button>
              </Link>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Contribute on GitHub
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
