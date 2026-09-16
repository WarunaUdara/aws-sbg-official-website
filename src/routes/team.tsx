import { createFileRoute, Link } from '@tanstack/react-router'
import { Users, Award, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MOCK_TEAM } from '@/features/team/data'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export const Route = createFileRoute('/team')({
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
            Meet the Team Behind <span className="aws-gradient-text">AWS SBG USJ</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            A student-led initiative bridging academic learning with real-world cloud engineering at the University of Sri Jayewardenepura.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {MOCK_TEAM.map((member) => {
            const isLeader = member.role.toLowerCase().includes('leader')
            return (
              <Card
                key={member.id}
                className={`flex flex-col h-full bg-[#161F2E]/80 border transition-all duration-300 rounded-none relative ${
                  isLeader ? 'border-[#FF9900]/60 shadow-[0_0_20px_rgba(255,153,0,0.12)]' : 'border-white/10 hover:border-[#FF9900]/40'
                }`}
              >
                {isLeader && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-[#FF9900] text-[#0A0E17] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#FF9900] select-none">
                    Group Leader
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-none bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xl text-[#FF9900] shadow-inner font-mono shrink-0">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white font-display">
                        {member.name}
                      </CardTitle>
                      <p className="text-xs text-[#FF9900] font-mono">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {member.faculty}
                      </p>
                    </div>
                  </div>
                </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <CardDescription className="text-xs sm:text-sm">
                  {member.bio}
                </CardDescription>

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
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
              </CardContent>

              <CardFooter className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-none text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
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
                    className="p-1.5 rounded-none text-slate-400 hover:text-[#0077B5] hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </CardFooter>
            </Card>
          )})}
        </div>

        {/* Join Leadership CTA */}
        <div className="rounded-none border border-white/10 bg-[#161F2E]/60 p-8 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white">
            Want to Lead, Speak, or Organize with Us?
          </h3>
          <p className="text-sm text-slate-400">
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
