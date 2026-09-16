import * as React from "react"
import { Container } from "@/components/common/Container"
import { SITE_CONFIG } from "@/lib/constants"

export function Stats() {
  return (
    <section className="py-14 bg-gradient-to-b from-[#0b0f19] to-slate-950">
      <Container size="lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SITE_CONFIG.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9900] to-[#FFA41C] mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
