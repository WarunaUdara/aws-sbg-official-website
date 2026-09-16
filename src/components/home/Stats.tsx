import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"
import CountUp from "@/components/ui/CountUp"
import { cn } from "@/lib/utils"

export function Stats() {
  return (
    <section className="py-12 bg-[#0A0E17] border-b border-white/10">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 bg-[#0A0E17]">
          {SITE_CONFIG.stats.map((stat, i) => {
            const numericValue = parseInt(stat.value.replace(/\D/g, ""), 10) || 0
            const suffix = stat.value.replace(/\d/g, "")

            return (
              <div
                key={stat.label}
                className={cn(
                  "p-6 sm:p-7 text-left hover:bg-[#161F2E]/40 transition-colors border-white/10 group",
                  // Mobile (2 cols, 2 rows):
                  i === 0 && "border-r border-b",
                  i === 1 && "border-b",
                  i === 2 && "border-r",
                  i === 3 && "",
                  // Desktop (4 cols, 1 row):
                  i < 3 && "md:border-r md:border-b-0",
                  i === 3 && "md:border-r-0 md:border-b-0"
                )}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFA41C] mb-2 tracking-tight font-display group-hover:scale-[1.02] transition-transform origin-left">
                  <CountUp
                    from={0}
                    to={numericValue}
                    duration={2}
                    separator=","
                    className="tabular-nums"
                  />
                  <span>{suffix}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-200 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FF9900] inline-block" />
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
