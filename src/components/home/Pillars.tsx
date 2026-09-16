import { Cpu, Award, Rocket, Compass } from "lucide-react"
import { Container } from "@/components/common/Container"
import { ShapeGrid } from "@/components/ui/ShapeGrid"

const PILLARS = [
  {
    icon: Cpu,
    number: "01",
    title: "Learn AWS Services",
    description:
      "Build scalable systems with Serverless, Bedrock, and DynamoDB. Move straight from theory into real code.",
    badge: "Hands-on",
  },
  {
    icon: Compass,
    number: "02",
    title: "Network with Experts",
    description:
      "Connect directly with AWS Community Heroes, Solutions Architects, and student peers across Sri Lanka.",
    badge: "Mentorship",
  },
  {
    icon: Award,
    number: "03",
    title: "Earn Certifications",
    description:
      "Join study cohorts, practice labs, and access exam voucher discounts for official AWS certifications.",
    badge: "Credentials",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch Real Projects",
    description:
      "Ship software for campus hackathons and graduate with a verified production portfolio on GitHub.",
    badge: "Portfolio",
  },
]

export function Pillars() {
  return (
    <section className="py-20 sm:py-24 border-b border-white/10 bg-[#0A0E17] relative overflow-hidden">
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
        <div className="mb-14 pointer-events-auto max-w-2xl space-y-3">
          <span className="text-xs font-mono font-semibold text-[#FF9900] tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF9900]" /> Why Join AWS SBG USJ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Why Join AWS Student Builder Group?
          </h2>
          <p className="text-slate-200 text-base sm:text-lg font-sans leading-relaxed text-pretty">
            Accelerate your cloud career with hands-on labs, industry mentorship, and an active community of student developers.
          </p>
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
                      {pillar.number}
                    </span>
                    <span className="text-xs font-mono tracking-wider text-slate-200 bg-[#0A0E17] px-2 py-0.5 border border-white/15">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="p-3 w-fit bg-[#0A0E17] border border-[#FF9900]/30 text-[#FF9900] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans">
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
