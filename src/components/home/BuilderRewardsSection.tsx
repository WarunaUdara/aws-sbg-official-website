import { Gift, Award, Cloud, Sparkles, ArrowRight } from "lucide-react"
import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

const REWARDS = [
  {
    icon: Cloud,
    tag: "AWS Credits",
    title: "Promotional Cloud Credits",
    detail: "Get $30–$100 in AWS promotional credits to build architectures and host apps with zero personal expense.",
  },
  {
    icon: Sparkles,
    tag: "Skill Builder",
    title: "12 Months Free Skill Builder",
    detail: "Free access to 600+ courses, interactive Cloud Quest 3D games, and guided sandbox labs.",
  },
  {
    icon: Award,
    tag: "Certifications",
    title: "Exam Voucher Support",
    detail: "Study cohorts, practice tests, and subsidized exam voucher discounts for official AWS certifications.",
  },
  {
    icon: Gift,
    tag: "Community Swag",
    title: "Swag & Digital Badges",
    detail: "Exclusive AWS stickers, apparel, and verifiable Credly digital badges to spotlight on LinkedIn.",
  },
]

export function BuilderRewardsSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#0A0E17] border-b border-white/10 relative overflow-hidden">
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
            <p className="text-slate-200 text-base sm:text-lg font-sans leading-relaxed text-pretty">
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

        {/* Connected Feature Grid matching LearningTracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#0A0E17]">
          {REWARDS.map((reward, i) => {
            const Icon = reward.icon
            return (
              <div
                key={reward.tag}
                className={cn(
                  "p-6 sm:p-7 flex flex-col justify-between hover:bg-[#161F2E]/40 transition-colors group border-white/10",
                  // Mobile (1 col): bottom border on 0,1,2
                  i < 3 && "border-b",
                  // Tablet (2 cols):
                  i === 0 && "md:border-r md:border-b",
                  i === 1 && "md:border-r-0 md:border-b",
                  i === 2 && "md:border-r md:border-b-0",
                  i === 3 && "md:border-r-0 md:border-b-0",
                  // Desktop (4 cols):
                  i < 3 && "lg:border-r lg:border-b-0",
                  i === 3 && "lg:border-r-0 lg:border-b-0"
                )}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                    <span className="text-[11px] font-mono font-bold text-[#FF9900] tracking-wider uppercase">
                      {reward.tag}
                    </span>
                    <div className="p-2 bg-[#0A0E17] border border-white/10 text-[#FF9900] group-hover:border-[#FF9900] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {reward.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-sans">
                    {reward.detail}
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
