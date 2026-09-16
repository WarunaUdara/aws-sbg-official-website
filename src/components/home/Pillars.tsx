import * as React from "react"
import { Cpu, Award, Rocket, Compass } from "lucide-react"
import { Container } from "@/components/common/Container"

const PILLARS = [
  {
    icon: Cpu,
    title: "Hands-on Cloud Labs",
    description:
      "Move beyond theory. Dive deep into practical workshops covering AWS Lambda, ECS, S3, IAM, and infrastructure as code with AWS CDK.",
    badge: "Practical Skills",
  },
  {
    icon: Award,
    title: "Certification Cohorts",
    description:
      "Join peer study sprints for AWS Cloud Practitioner and Solutions Architect Associate, with practice exam guides and voucher discounts.",
    badge: "Industry Credentials",
  },
  {
    icon: Rocket,
    title: "Hackathons & Builds",
    description:
      "Collaborate in inter-university cloud hackathons, ship full-stack applications, and create impactful solutions for Sri Lanka.",
    badge: "Builder Culture",
  },
  {
    icon: Compass,
    title: "Industry Mentorship",
    description:
      "Connect with AWS Community Builders, Solutions Architects, and alumni working at top tech firms globally and locally.",
    badge: "Career Growth",
  },
]

export function Pillars() {
  return (
    <section className="py-20 border-y border-slate-900 bg-slate-950/50">
      <Container size="lg">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-[#FF9900] tracking-widest uppercase">
            What We Do
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Builders, by Builders
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to master modern cloud engineering and build a competitive portfolio while at university.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="aws-card-glow rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-lg bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-800/80 px-2 py-1 rounded">
                      {pillar.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
