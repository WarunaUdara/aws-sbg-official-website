import { Gift, Award, Cloud, Sparkles, Check, ArrowRight } from "lucide-react"
import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"

const REWARDS = [
  {
    icon: Cloud,
    tag: "AWS Credits",
    title: "Promotional Cloud Credits",
    detail: "Get $30–$100 in AWS promotional credits to build architectures and host apps with zero personal expense.",
    highlight: "Zero out-of-pocket cost",
  },
  {
    icon: Sparkles,
    tag: "Skill Builder",
    title: "12 Months Free Skill Builder",
    detail: "Free access to 600+ courses, interactive Cloud Quest 3D games, and guided sandbox labs.",
    highlight: "600+ official courses",
  },
  {
    icon: Award,
    tag: "Certifications",
    title: "Exam Voucher Support",
    detail: "Study cohorts, practice tests, and subsidized exam voucher discounts for official AWS certifications.",
    highlight: "Global AWS credentials",
  },
  {
    icon: Gift,
    tag: "Community Swag",
    title: "Swag & Digital Badges",
    detail: "Exclusive AWS stickers, apparel, and verifiable Credly digital badges to spotlight on LinkedIn.",
    highlight: "Verifiable on LinkedIn",
  },
]

export function BuilderRewardsSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#0B101B] border-b border-white/10 relative overflow-hidden">
      {/* Subtle coordinate dot pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 153, 0, 0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <Gift className="w-3.5 h-3.5" />
              <span>Member Perks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              Student Builder Benefits
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed text-pretty">
              Active members in our workshops, hackathons, and cohorts earn official AWS resources, exam discounts, and verifiable credentials.
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
