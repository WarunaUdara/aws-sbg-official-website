import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Users, Award, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MOCK_TEAM } from '@/features/team/data'
import { createSeoMeta } from '@/lib/seo'
import { ShinyText } from '@/components/ui/ShinyText'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function TeamAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  const [hasError, setHasError] = React.useState(false)

  return (
    <div className="w-20 h-20 rounded-none bg-[#151515] border border-white/10 group-hover:border-[#FF9900]/40 flex items-center justify-center overflow-hidden shrink-0 transition-colors">
      {avatarUrl && !hasError ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="font-bold text-2xl text-[#FF9900] font-mono select-none">
          {getInitials(name)}
        </span>
      )}
    </div>
  )
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
  const leader = MOCK_TEAM.find((m) => m.role.toLowerCase().includes('leader'))
  const coreMembers = MOCK_TEAM.filter(
    (m) => !m.role.toLowerCase().includes('leader')
  )

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

        {/* Team Grid: Leader Card + 3x2 Member Grid */}
        <div className="border border-white/10 bg-white/10 space-y-px mb-20">
          {/* Group Leader Hero Card */}
          {leader && (
            <div className="group relative bg-[#0D0D0D] hover:bg-[#151515]/40 transition-colors duration-200 p-6 sm:p-8">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 bg-[#FF9900] text-[#0D0D0D] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#FF9900] select-none">
                Group Leader
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <TeamAvatar name={leader.name} avatarUrl={leader.avatarUrl} />
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display group-hover:text-[#FF9900] transition-colors">
                      {leader.name}
                    </h2>
                    <p className="text-xs text-[#FF9900] font-mono mt-0.5">
                      {leader.role}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {leader.faculty}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans mt-3 max-w-2xl">
                      {leader.bio}
                    </p>
                    {leader.certifications && leader.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {leader.certifications.map((cert) => (
                          <Badge
                            key={cert}
                            variant="aws"
                            className="text-[10px] rounded-none font-mono"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {leader.github && (
                    <a
                      href={leader.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      aria-label={`${leader.name}'s GitHub profile`}
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-300 hover:text-[#0077B5] hover:bg-white/5 transition-colors border border-transparent hover:border-[#0077B5]/30"
                      aria-label={`${leader.name}'s LinkedIn profile`}
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 6 Remaining Leads in a Seamless 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {coreMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col justify-between bg-[#0D0D0D] hover:bg-[#151515]/40 transition-colors duration-200 p-6 group"
              >
                <div>
                  <div className="flex items-center gap-5 mb-5">
                    <TeamAvatar name={member.name} avatarUrl={member.avatarUrl} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-white font-display group-hover:text-[#FF9900] transition-colors truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#FF9900] font-mono mt-0.5 truncate">
                        {member.role}
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5 truncate">
                        {member.faculty}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4 min-h-[4rem]">
                    {member.bio}
                  </p>

                  <div className="min-h-[3rem]">
                    {member.certifications && member.certifications.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Award className="w-3 h-3 text-[#FF9900]" /> Credentials
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.certifications.map((cert) => (
                            <Badge
                              key={cert}
                              variant="aws"
                              className="text-[10px] rounded-none font-mono"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      aria-label={`${member.name}'s GitHub profile`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-300 hover:text-[#0077B5] hover:bg-white/5 transition-colors border border-transparent hover:border-[#0077B5]/30"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Leadership CTA */}
        <div className="rounded-none border border-white/10 bg-[#151515]/60 p-8 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white font-display">
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