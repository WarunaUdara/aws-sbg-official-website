import { createFileRoute, Link } from '@tanstack/react-router'
import { Users, Award, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MOCK_TEAM } from '@/features/team/data'
import { cn } from '@/lib/utils'
import { createSeoMeta } from '@/lib/seo'
import { ShinyText } from '@/components/ui/ShinyText'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export const Route = createFileRoute('/team')({
  head: () =>
    createSeoMeta({
      title: 'Core Team & Mentors | AWS Student Builder Group USJ',
      description:
        'Meet the student leaders, cloud architects, and community mentors guiding AWS Student Builder Group at University of Sri Jayewardenepura.',
      path: '/team',
    }),
  component: TeamPage,
})

function TeamPage() {
  return (
    <div className="py-12 md:py-20">
      <Container size="lg">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Student Leadership & Core Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Meet the Team Behind{' '}
            <ShinyText
              text="AWS SBG USJ"
              color="#FF9900"
              shineColor="#FFFFFF"
              speed={3}
              spread={120}
            />
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            A student-led initiative bridging academic learning with real-world cloud engineering at the University of Sri Jayewardenepura.
          </p>
        </div>

        {/* Connected Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10 bg-[#0A0E17] mb-20">
          {MOCK_TEAM.map((member, i) => {
            const isLeader = member.role.toLowerCase().includes('leader')
            const isLastRowMobile = i === MOCK_TEAM.length - 1
            const isLastColTablet = i % 2 === 1 || i === MOCK_TEAM.length - 1
            const isLastColDesktop = i % 3 === 2 || i === MOCK_TEAM.length - 1

            return (
              <div
                key={member.id}
                className={cn(
                  "flex flex-col justify-between h-full bg-[#0A0E17] hover:bg-[#161F2E]/40 transition-colors duration-200 rounded-none relative border-white/10 p-6 group",
                  !isLastRowMobile && "border-b",
                  !isLastColTablet && "md:border-r",
                  !isLastColDesktop && "lg:border-r",
                  isLastColDesktop && "lg:border-r-0"
                )}
              >
                {isLeader && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-[#FF9900] text-[#0A0E17] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#FF9900] select-none">
                    Group Leader
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-none bg-[#161F2E] border border-white/10 group-hover:border-[#FF9900]/40 flex items-center justify-center font-bold text-xl text-[#FF9900] font-mono shrink-0 transition-colors">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-[#FF9900] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#FF9900] font-mono">
                        {member.role}
                      </p>
                      <p className="text-xs text-slate-300">
                        {member.faculty}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4">
                    {member.bio}
                  </p>

                  {/* Certifications */}
                  {member.certifications && member.certifications.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#FF9900]" /> Credentials
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.certifications.map((cert) => (
                          <Badge key={cert} variant="aws" className="text-[10px] rounded-none font-mono">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-auto">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-none text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      aria-label="GitHub profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-none text-slate-300 hover:text-[#0077B5] hover:bg-white/5 transition-colors border border-transparent hover:border-[#0077B5]/30"
                      aria-label="LinkedIn profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Join Leadership CTA */}
        <div className="rounded-none border border-white/10 bg-[#161F2E]/60 p-8 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white">
            Want to Lead, Speak, or Organize with Us?
          </h3>
          <p className="text-base text-slate-300">
            We are always looking for enthusiastic student coordinators, workshop facilitators,
            and content creators to join our core crew.
          </p>
          <Link to="/contact">
            <Button variant="glow" size="md">
              Join the Team
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
