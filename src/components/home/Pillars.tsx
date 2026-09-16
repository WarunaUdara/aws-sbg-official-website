import * as React from "react"
import { Cpu, Award, Rocket, Compass, CheckSquare } from "lucide-react"
import { Container } from "@/components/common/Container"
import { ShapeGrid } from "@/components/ui/ShapeGrid"

const PILLARS = [
  {
    icon: Cpu,
    tag: "[ LAB 01 ]",
    title: "Hands-on Cloud Labs",
    description:
      "Move beyond theory. Build on AWS Lambda, Amazon Bedrock, DynamoDB, and deploy Infrastructure as Code with AWS CDK and TypeScript.",
    badge: "PRACTICAL",
  },
  {
    icon: Award,
    tag: "[ CERT 02 ]",
    title: "Certification Sprints",
    description:
      "Structured cohorts for AWS Certified Cloud Practitioner and Solutions Architect Associate with practice labs and voucher support.",
    badge: "CREDENTIALS",
  },
  {
    icon: Rocket,
    tag: "[ BUILD 03 ]",
    title: "Builder Hackathons",
    description:
      "Collaborate in 24-hour cloud hackathons, create impactful real-world software, and compete for AWS student builder awards.",
    badge: "INNOVATION",
  },
  {
    icon: Compass,
    tag: "[ GUIDE 04 ]",
    title: "Industry Mentorship",
    description:
      "Connect with AWS Community Builders, AWS User Group Sri Lanka architects, and engineering alumni working across global clouds.",
    badge: "CAREER",
  },
]

export function Pillars() {
  return (
    <section className="py-24 border-b border-white/10 bg-[#0A0E17] relative overflow-hidden">
      {/* Interactive ShapeGrid Animated Canvas Background */}
      <div className="absolute inset-0 pointer-events-auto opacity-75">
        <ShapeGrid
          shape="square"
          squareSize={48}
          direction="diagonal"
          speed={0.4}
          borderColor="rgba(255, 153, 0, 0.12)"
          hoverFillColor="rgba(255, 153, 0, 0.28)"
          hoverTrailAmount={5}
          vignetteColor="#0A0E17"
        />
      </div>

      <Container size="lg" className="relative z-10 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pointer-events-auto">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF9900]" /> [ FOUNDATIONAL PILLARS ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Engineered for Builders.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
              Every initiative is designed to build technical depth, professional certifications,
              and collaborative engineering portfolios while studying at USJ.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400 bg-[#161F2E] px-4 py-2 border border-white/10">
            <span>GRID_ALIGN: TRUE</span>
            <span className="text-[#FF9900]">● ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="aws-card-glow p-6 flex flex-col justify-between group border border-white/10 hover:border-[#FF9900]/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                    <span className="text-xs font-mono text-[#FF9900] font-bold">
                      {pillar.tag}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase bg-[#0A0E17] px-2 py-0.5 border border-white/10">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="p-3 w-fit bg-[#0A0E17] border border-[#FF9900]/30 text-[#FF9900] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
