import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"

export function Stats() {
  return (
    <section className="py-12 bg-[#0A0E17] border-b border-white/10">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SITE_CONFIG.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-none bg-[#161F2E]/60 border border-white/10 hover:border-[#FF9900]/40 backdrop-blur-sm transition-colors text-left"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFA41C] mb-2 tracking-tight font-display">
                {stat.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF9900] inline-block" />
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
