import { Gift, Award, Cloud, Sparkles, Check, ArrowRight } from "lucide-react"
import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"

const REWARDS = [
  {
    icon: Cloud,
    tag: "AWS CREDITS",
    title: "Promotional Cloud Credits",
    detail: "Up to $30 - $100 in promotional AWS credits to build personal architectures, test services, and deploy production apps with zero personal expense.",
    highlight: "ZERO OUT-OF-POCKET COST",
  },
  {
    icon: Sparkles,
    tag: "SKILL BUILDER",
    title: "12 Months Free Skill Builder",
    detail: "Full access to official AWS Skill Builder courses, Cloud Quest 3D gamified learning, hands-on guided sandbox labs, and practice exams.",
    highlight: "600+ OFFICIAL COURSES",
  },
  {
    icon: Award,
    tag: "CERTIFICATIONS",
    title: "Exam Voucher Guidance",
    detail: "Subsidized and discounted exam vouchers, study group cohorts, and direct mentorship for AWS Cloud Practitioner and Solutions Architect certifications.",
    highlight: "GLOBAL AWS CREDENTIALS",
  },
  {
    icon: Gift,
    tag: "COMMUNITY SWAG",
    title: "Swag & Digital Badges",
    detail: "Exclusive AWS Student Builder Group stickers, apparel, and verifiable Credly digital badges to spotlight your skills to tech employers.",
    highlight: "VERIFIABLE ON LINKEDIN",
  },
]

export function BuilderRewardsSection() {
  return (
    <section className="py-24 bg-[#0B101B] border-b border-white/10 relative overflow-hidden">
      {/* Subtle coordinate dot pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 153, 0, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <Gift className="w-3.5 h-3.5" />
              <span>[ OFFICIAL AWS BUILDER BENEFITS ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Student Rewards at USJ
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
              Every learner participating in our workshops, hackathons, and community sprints earns official recognition, cloud resources, and verifiable career milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#0A0E17] font-mono text-xs font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2 rounded-none"
            >
              <span>Join WhatsApp Channel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4-Card Reward Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REWARDS.map((reward) => {
            const Icon = reward.icon
            return (
              <div
                key={reward.tag}
                className="p-6 bg-[#111827] border border-white/10 hover:border-[#FF9900]/60 transition-all duration-300 flex flex-col justify-between group rounded-none"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="text-[11px] font-mono font-bold text-[#FF9900]">
                      {reward.tag}
                    </span>
                    <div className="p-2 bg-[#0A0E17] border border-white/10 text-[#FF9900] group-hover:border-[#FF9900] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {reward.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                    {reward.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    {reward.highlight}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
