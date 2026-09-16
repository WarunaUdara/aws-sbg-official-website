import * as React from "react"
import { Container } from "@/components/common/Container"
import { 
  GitBranch, 
  Cpu, 
  RotateCcw, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Server,
  Layers,
  SlidersHorizontal
} from "lucide-react"

type WorkflowTab = "connect" | "deploy" | "preview" | "ship" | "validate"

interface TabConfig {
  id: WorkflowTab
  label: string
  headline: string
  subhead: string
  description: string
}

const TABS: TabConfig[] = [
  {
    id: "connect",
    label: "Connect",
    headline: "Connect a repo and push code",
    subhead: "Git-based deploys, zero setup",
    description: "Link your GitHub or GitLab repository once and trigger automated AWS CDK synthesis and serverless container builds on every push. No complex pipelines or manual steps needed."
  },
  {
    id: "deploy",
    label: "Deploy",
    headline: "Deploy Docker containers",
    subhead: "Any language, any framework",
    description: "Run persistent containers on AWS ECS and Fargate that stay online, handle healthchecks automatically, and autoscale with incoming student and campus traffic."
  },
  {
    id: "preview",
    label: "Preview",
    headline: "Ephemeral branch previews",
    subhead: "Isolated environments per PR",
    description: "Every pull request automatically provisions an isolated AWS Amplify & CloudFront preview environment with dedicated API routing, SSL, and instant preview URLs."
  },
  {
    id: "ship",
    label: "Ship",
    headline: "Ship immutable versions",
    subhead: "Instant rollbacks, no guesswork",
    description: "Keep production releases safe with instant rollback paths. Switch traffic back instantly without rebuilding or redeploying. Previous instances stay warm for 30 minutes."
  },
  {
    id: "validate",
    label: "Validate",
    headline: "Global synthetic validation",
    subhead: "Automated healthchecks at the edge",
    description: "CloudWatch Synthetics monitors your endpoints from multiple AWS edge regions, verifying p99 latencies, DNS propagation, and TLS integrity round-the-clock."
  }
]

export function BuilderWorkflowTabs() {
  const [activeTab, setActiveTab] = React.useState<WorkflowTab>("connect")
  const [copied, setCopied] = React.useState(false)
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0]

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 bg-[#0A0E17] relative border-b border-white/10 overflow-hidden">
      <Container size="lg">
        {/* Header with Eyebrow & Dual Columns */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/20 text-xs font-mono tracking-wider uppercase mb-6">
            <span className="w-2 h-2 bg-[#00A4E4] inline-block" />
            <span className="text-white font-semibold">Build & Deploy</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
                Deploy in minutes. Roll back in seconds. Ship with confidence at any scale.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Infrastructure that moves with your code. Review changes in isolated previews,
                then promote the exact tested artifact directly to AWS production.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Stage Interactive Tab Bar */}
        <div className="border border-white/15 bg-black/40">
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-3.5 px-4 text-center font-mono text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "text-white bg-[#161F2E]/90"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {/* Top indicator line for active tab */}
                  {isActive && (
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF9900]" />
                  )}
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Left Column: Context & Descriptions */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/15 bg-[#0A0E17]/80">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                    {currentTab.headline}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-400 font-medium mt-1">
                    {currentTab.subhead}
                  </p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Tab-Specific Badges / Meta Info */}
              <div className="pt-8 border-t border-white/10 mt-8">
                {activeTab === "connect" && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Supported Git Providers
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                      <span className="px-2 py-1 bg-white/5 border border-white/10">GitHub</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10">GitLab</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10">AWS CodeCommit</span>
                    </div>
                  </div>
                )}

                {activeTab === "deploy" && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Optimized Multi-Architecture Runtimes
                    </span>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1.5"><span className="text-[#FF9900]">●</span> Python</span>
                      <span className="flex items-center gap-1.5"><span className="text-[#3178C6]">●</span> TypeScript</span>
                      <span className="flex items-center gap-1.5"><span className="text-[#00ADD8]">●</span> Go</span>
                      <span className="flex items-center gap-1.5"><span className="text-[#F89820]">●</span> Java</span>
                      <span className="flex items-center gap-1.5"><span className="text-[#DEA584]">●</span> Rust</span>
                    </div>
                  </div>
                )}

                {activeTab === "preview" && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Edge Distribution
                    </span>
                    <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 inline-block" />
                      AWS CloudFront 600+ Global PoPs Active
                    </p>
                  </div>
                )}

                {activeTab === "ship" && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Zero-Downtime Traffic Shifting
                    </span>
                    <p className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-amber-400 inline-block" />
                      AWS Route 53 Weighted Routing (0-100%)
                    </p>
                  </div>
                )}

                {activeTab === "validate" && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Synthetic Probes
                    </span>
                    <p className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-400 inline-block" />
                      Multi-region p99 Latency &lt; 35ms Verified
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Visual Interactive Mockup Card */}
            <div className="lg:col-span-7 relative p-6 sm:p-10 flex items-center justify-center overflow-hidden bg-black">
              {/* Background Halftone / Dither Pattern with Accent Geometry */}
              <div className="absolute inset-0 bg-dot-matrix opacity-25" />
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF9900]/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#FF9900] opacity-85 hidden sm:block pointer-events-none" />
              <div className="absolute top-8 right-8 w-12 h-12 bg-[#00A4E4] opacity-80 hidden sm:block pointer-events-none" />

              {/* CARD: Tab 1 (Connect) */}
              {activeTab === "connect" && (
                <div className="relative w-full max-w-lg bg-[#101722] border border-white/20 p-6 sm:p-7 shadow-2xl z-10 text-left">
                  <div className="text-[11px] font-mono text-slate-400 mb-4 flex items-center gap-2">
                    <span>Acme</span>
                    <span>/</span>
                    <span>AWS-SBG-USJ</span>
                    <span>/</span>
                    <span className="text-white">Import Git repository</span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 font-display">
                    Import Git repository
                  </h4>
                  <p className="text-xs text-slate-400 mb-5">
                    Choose a repository to enable automatic AWS deployments on every push.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-[#FF9900]" />
                        <span>aws-sbg-usj</span>
                      </div>
                      <div className="relative flex-1">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          readOnly
                          value="Search repositories"
                          className="w-full pl-8 pr-12 py-1.5 bg-white/5 border border-white/10 text-xs font-mono text-slate-400 focus:outline-none"
                        />
                        <span className="absolute right-2.5 top-1.5 text-[10px] font-mono bg-white/10 px-1.5 py-0.5 text-slate-300">
                          ⌘K
                        </span>
                      </div>
                    </div>

                    {/* Repo Row 1 */}
                    <div className="p-3.5 bg-black/60 border border-white/15 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs text-white">
                          λ
                        </div>
                        <div>
                          <div className="text-xs font-mono text-white font-bold">
                            serverless-order-stream
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Updated 12m ago • TypeScript CDK
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold transition-colors cursor-pointer">
                        Connect
                      </button>
                    </div>

                    {/* Repo Row 2 */}
                    <div className="p-3.5 bg-black/30 border border-white/10 flex items-center justify-between opacity-75">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-slate-400">
                          ⚙
                        </div>
                        <div>
                          <div className="text-xs font-mono text-slate-300">
                            bedrock-rag-knowledge-base
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            Updated 2h ago • Python
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Connected
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD: Tab 2 (Deploy) */}
              {activeTab === "deploy" && (
                <div className="relative w-full max-w-lg bg-[#101722] border border-white/20 shadow-2xl z-10 text-left flex">
                  {/* Vertical mini sidebar */}
                  <div className="w-12 border-r border-white/10 p-3 flex flex-col items-center gap-4 bg-black/40">
                    <div className="w-6 h-6 bg-[#FF9900] flex items-center justify-center text-black font-mono font-bold text-xs">
                      ▲
                    </div>
                    <Cpu className="w-4 h-4 text-white" />
                    <Server className="w-4 h-4 text-slate-500" />
                    <Layers className="w-4 h-4 text-slate-500" />
                    <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  </div>

                  {/* Runtime settings content */}
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-lg font-bold text-white font-display">
                        Container Runtime
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase">
                        Always On
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-5">
                      Run your containerized microservices on AWS ECS Fargate with zero host maintenance.
                    </p>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Limit for CPU per replica</span>
                        <span className="text-white bg-white/10 px-2 py-0.5 border border-white/15">
                          8 vCPU ▾
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Limit for Memory per replica</span>
                        <span className="text-white bg-white/10 px-2 py-0.5 border border-white/15">
                          16 GB ▾
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">Limit for Ephemeral disks</span>
                        <span className="text-slate-300">100 GB</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-slate-400">HTTP Port</span>
                        <span className="text-white font-bold">8080</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-slate-400">Healthcheck</span>
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="bg-white/10 px-1 text-[10px] text-white">GET</span>
                          /v1/liveness
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD: Tab 3 (Preview) */}
              {activeTab === "preview" && (
                <div className="relative w-full max-w-lg bg-[#101722] border border-white/20 p-6 sm:p-7 shadow-2xl z-10 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-emerald-400" />
                      <span className="text-xs font-mono text-white font-bold uppercase">
                        PR #42 Preview Environment
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Synthesized in 1.4s
                    </span>
                  </div>

                  <div className="p-3 bg-black/60 border border-white/15 font-mono text-xs space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Branch</span>
                      <span className="text-[#FF9900]">feat/bedrock-inference-api</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Commit</span>
                      <span className="text-white">e4c91a0 (Head)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Amplify Edge Domain</span>
                      <span className="text-emerald-400">pr-42.preview.aws-sbg.usj.lk</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-white/5 border border-white/15 text-xs font-mono text-slate-300 truncate">
                      https://pr-42.preview.aws-sbg.usj.lk
                    </div>
                    <button
                      onClick={() => handleCopy("https://pr-42.preview.aws-sbg.usj.lk")}
                      className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer"
                      title="Copy URL"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-3 py-2 bg-[#FF9900] hover:bg-[#e68a00] text-black font-mono text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* CARD: Tab 4 (Ship) */}
              {activeTab === "ship" && (
                <div className="relative w-full max-w-lg bg-[#101722] border border-white/20 p-6 sm:p-7 shadow-2xl z-10 text-left">
                  <h4 className="text-xl font-bold text-white mb-1 font-display">
                    Rollback to version
                  </h4>
                  <p className="text-xs text-slate-400 mb-5">
                    Switch the live AWS production deployment to a target stable version instantly.
                  </p>

                  <div className="space-y-3 font-mono text-xs mb-6">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                      Current active deployment
                    </div>
                    <div className="p-3.5 bg-black/60 border border-white/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-white font-bold flex items-center gap-2">
                            <span>v_alpha001</span>
                            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px]">
                              Active
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Add auth routes + CloudWatch audit logging
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="border border-white/10 px-1.5 py-0.5">main</span>
                        <span className="border border-white/10 px-1.5 py-0.5">a9f3c2d</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 uppercase tracking-wider pt-2">
                      Target rollback version
                    </div>
                    <div className="p-3.5 bg-black/30 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 text-slate-500 font-mono">◷</div>
                        <div>
                          <div className="text-slate-300 font-medium flex items-center gap-2">
                            <span>v_alpha000</span>
                            <span className="px-1.5 py-0.5 bg-white/10 text-slate-400 text-[10px]">
                              Inactive
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Old stable fallback baseline
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="border border-white/10 px-1.5 py-0.5">dev</span>
                        <span className="border border-white/10 px-1.5 py-0.5">7b84e1a</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-white hover:bg-slate-200 text-black font-mono text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md">
                    Rollback to target version
                  </button>
                </div>
              )}

              {/* CARD: Tab 5 (Validate) */}
              {activeTab === "validate" && (
                <div className="relative w-full max-w-lg bg-[#101722] border border-white/20 p-6 sm:p-7 shadow-2xl z-10 text-left font-mono">
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-xs text-white font-bold">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>AWS CloudWatch Synthetics</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      100% HEALTHY
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                    <div className="p-3 bg-black/50 border border-white/10">
                      <div className="text-xl font-bold text-white">28ms</div>
                      <div className="text-[10px] text-slate-400">p99 Latency</div>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/10">
                      <div className="text-xl font-bold text-emerald-400">0.00%</div>
                      <div className="text-[10px] text-slate-400">Error Rate</div>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/10">
                      <div className="text-xl font-bold text-[#FF9900]">600+</div>
                      <div className="text-[10px] text-slate-400">Edge PoPs</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400" />
                        ap-south-1 (Mumbai / Colombo Edge)
                      </span>
                      <span className="text-emerald-400">14ms • OK</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400" />
                        us-east-1 (N. Virginia)
                      </span>
                      <span className="text-emerald-400">32ms • OK</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400" />
                        eu-west-1 (Ireland)
                      </span>
                      <span className="text-emerald-400">26ms • OK</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
