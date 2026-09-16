import { Container } from "@/components/common/Container"
import { Shield, Globe, Lock, Cpu, BarChart3, Sliders } from "lucide-react"

export function ArchitectureGrid() {
  // ASCII Binary Matrix for Card 1 (Auth + Keys)
  const asciiKeyRows = [
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0",
    "0 0 0 0 0 0 1 1 0 1 1 0 0 0 0 0",
    "0 0 0 0 0 1 1 0 0 0 1 1 0 0 0 0",
    "0 0 0 0 1 1 0 0 0 0 0 1 1 0 0 0",
    "0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0",
    "0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
  ]

  // Dot matrix rows for Card 3 (Validation)
  const validationGrid = Array.from({ length: 8 }).map((_, rowIdx) =>
    Array.from({ length: 24 }).map((_, colIdx) => {
      // Highlight certain dots to simulate a filter pattern
      const isRedBlocked = rowIdx === 3 && (colIdx >= 8 && colIdx <= 11)
      const isWhitePassed = (rowIdx === 2 && colIdx % 3 === 0) || (rowIdx === 5 && colIdx % 4 === 0)
      return { isRedBlocked, isWhitePassed }
    })
  )

  return (
    <section className="py-24 bg-[#0A0E17] border-b border-white/10 relative overflow-hidden">
      <Container size="lg">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/20 text-xs font-mono tracking-wider uppercase mb-6">
            <span className="w-2 h-2 bg-[#00A4E4] inline-block" />
            <span className="text-white font-semibold">Gateway & Edge Architecture</span>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              Protect and control traffic at the edge. Offload access control and rate limiting to global gateways.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
              Architected on Amazon Web Services serverless backbones, CloudFront edge networks,
              and Bedrock GenAI routing layers for unmatched durability and performance.
            </p>
          </div>
        </div>

        {/* 6-Card Architecture Matrix with Sharp 1px Border Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/15 bg-black/30">
          {/* CARD 1: Auth + Keys */}
          <div className="p-8 border-b md:border-r border-white/15 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-[#FF9900]">
                <Lock className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Auth + Keys</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                IAM Credentials & Token Vending
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage API keys and STS temporary credentials end to end. Fine-grained RBAC controls who can invoke what Lambda service.
              </p>
            </div>

            {/* Visual: ASCII Key Matrix */}
            <div className="mt-8 p-4 bg-[#06080E] border border-white/10 font-mono text-[11px] leading-tight select-none overflow-hidden">
              {asciiKeyRows.map((row, idx) => (
                <div key={idx} className="flex justify-center tracking-widest">
                  {row.split(" ").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className={
                        char === "1"
                          ? "text-[#FF9900] font-bold"
                          : "text-slate-700 opacity-60"
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
              <div className="text-center mt-2 text-[10px] text-slate-500 uppercase tracking-widest border-t border-white/5 pt-2">
                SHA-256 HMAC VERIFIED
              </div>
            </div>
          </div>

          {/* CARD 2: Global Platform & Edge Latency */}
          <div className="p-8 border-b lg:border-r border-white/15 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-[#00A4E4]">
                <Globe className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Global Platform</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Low Latency Multi-Region Routing
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Edge gateway enforces TLS termination and routes requests to the closest serverless replica with AWS Anycast.
              </p>
            </div>

            {/* Visual: Global Edge Network Topology */}
            <div className="mt-8 p-5 bg-[#06080E] border border-white/10 relative h-[210px] font-mono text-xs flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-dot-matrix-fine opacity-20" />

              {/* Node 1: Top Right */}
              <div className="relative z-10 self-end text-right">
                <div className="inline-block px-1.5 py-0.5 bg-white/10 border border-white/20 text-[10px] text-slate-300">
                  □ i-g7h8 instance
                </div>
                <div className="text-[10px] text-emerald-400">active</div>
              </div>

              {/* SVG Connecting Vectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/20">
                <line x1="20%" y1="70%" x2="45%" y2="40%" strokeDasharray="3,3" />
                <line x1="45%" y1="40%" x2="80%" y2="20%" stroke="#FF9900" strokeWidth="1.5" />
                <line x1="45%" y1="40%" x2="70%" y2="85%" strokeDasharray="3,3" />
              </svg>

              {/* Center Node */}
              <div className="relative z-10 self-center text-center">
                <div className="w-3 h-3 bg-[#FF9900] mx-auto mb-1 animate-pulse" />
                <div className="text-[11px] text-white font-bold">ap-south-1</div>
                <div className="text-[10px] text-slate-400">12ms Colombo</div>
              </div>

              {/* Bottom Nodes */}
              <div className="relative z-10 flex items-center justify-between text-[10px]">
                <div>
                  <span className="text-slate-400">eu-west-1</span>
                  <span className="text-slate-500 block">42ms</span>
                </div>
                <div>
                  <span className="text-slate-400">us-east-1</span>
                  <span className="text-slate-500 block">38ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Validation & Inspection */}
          <div className="p-8 border-b border-white/15 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-emerald-400">
                <Shield className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Validation</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Zero-Trust Schema Enforcement
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enforce request schemas and SQL/XSS sanitization early. Drop bad traffic before it invokes compute runtime.
              </p>
            </div>

            {/* Visual: Dot Matrix Filter */}
            <div className="mt-8 p-4 bg-[#06080E] border border-white/10 font-mono text-[10px] select-none">
              <div className="space-y-1">
                {validationGrid.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-between">
                    {row.map((dot, cIdx) => (
                      <span
                        key={cIdx}
                        className={
                          dot.isRedBlocked
                            ? "text-rose-500 font-bold"
                            : dot.isWhitePassed
                            ? "text-white"
                            : "text-slate-700"
                        }
                      >
                        {dot.isRedBlocked ? "●" : "○"}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/5 text-[10px]">
                <span className="text-rose-400 font-mono">4 Malicious Blocks</span>
                <span className="text-emerald-400 font-mono">99.8% Passed</span>
              </div>
            </div>
          </div>

          {/* CARD 4: Rate Limits */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/15 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-amber-400">
                <Sliders className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Rate Limits</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Sliding Window Throttling
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Set strict burst and steady-state quotas per IP, campus subnet, or API token using Redis / MemoryDB token buckets.
              </p>
            </div>

            {/* Visual: Rate Limit Meter */}
            <div className="mt-8 p-4 bg-[#06080E] border border-white/10 font-mono text-xs space-y-3">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Token Bucket Capacity</span>
                <span className="text-white font-bold">100 / 100 req/s</span>
              </div>
              <div className="w-full h-3 bg-white/5 border border-white/10 flex">
                <div className="w-[82%] bg-[#FF9900]" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                <span>Leaky Bucket Drain: 20/s</span>
                <span className="text-emerald-400">Healthy (82% used)</span>
              </div>
            </div>
          </div>

          {/* CARD 5: Real-Time Analytics */}
          <div className="p-8 border-b md:border-b-0 lg:border-r border-white/15 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-purple-400">
                <BarChart3 className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">Analytics</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Zero-Instrumentation Logs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access real-time telemetry, p95 latencies, status distributions, and egress trends directly through CloudWatch metrics.
              </p>
            </div>

            {/* Visual: Real-Time Metric Bars */}
            <div className="mt-8 p-4 bg-[#06080E] border border-white/10 font-mono text-xs space-y-3">
              <div className="flex items-end justify-between h-14 pt-2 gap-1.5 border-b border-white/10 pb-1">
                {[35, 60, 45, 80, 50, 95, 75, 40, 65, 90, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-full ${
                      i === 11 ? "bg-[#FF9900]" : "bg-white/15 hover:bg-white/30"
                    } transition-colors`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Requests: 2.4M/mo</span>
                <span className="text-purple-400">p95: 18ms</span>
              </div>
            </div>
          </div>

          {/* CARD 6: Amazon Bedrock Gateway */}
          <div className="p-8 flex flex-col justify-between group hover:bg-[#161F2E]/40 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-cyan-400">
                <Cpu className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">GenAI Routing</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Amazon Bedrock Gateways
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intelligent model fallback, token rate-limiting, and prompt caching across Claude 3.7 Sonnet, Amazon Titan, and Llama 3.
              </p>
            </div>

            {/* Visual: Bedrock Gateway Metrics */}
            <div className="mt-8 p-4 bg-[#06080E] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Active Model</span>
                <span className="text-cyan-300 font-bold">Claude 3.7 Sonnet</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Prompt Cache Hit</span>
                <span className="text-emerald-400 font-bold">94.2%</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Fallback Routing</span>
                <span className="text-[#FF9900]">Amazon Titan Express</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
