import { Container } from "@/components/common/Container"
import { cn } from "@/lib/utils"
import { MiniArchitectureVisualizer } from "./MiniArchitectureVisualizer"

const PATHWAY_TILE_ROWS = [5, 4, 2]

function PathwayCornerTiles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 hidden flex-col items-end opacity-80 lg:flex"
    >
      {PATHWAY_TILE_ROWS.map((tileCount, rowIndex) => (
        <div key={tileCount} className="flex">
          {Array.from({ length: tileCount }).map((_, tileIndex) => (
            <span
              key={`${rowIndex}-${tileIndex}`}
              className="size-16 shrink-0 border border-white/10"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function ServerlessGraphic() {
  return (
    <div className="h-40 w-full flex flex-col justify-center font-mono text-[10px] space-y-1 select-none">
      <div className="flex items-center justify-between text-slate-500 pb-1.5 border-b border-white/10 text-[9px]">
        <span>SERVICE</span>
        <span>EVENT</span>
        <span>STATUS</span>
      </div>
      <div className="flex items-center justify-between py-1 px-1.5 text-slate-400">
        <span className="text-slate-300">auth_verify</span>
        <span className="text-slate-500">api_gateway</span>
        <span className="text-emerald-400">active</span>
      </div>
      {/* Active Highlighted Row in AWS Orange */}
      <div className="flex items-center justify-between py-1.5 px-2 bg-[#FF9900] text-[#0D0D0D] font-semibold">
        <span>order_worker</span>
        <span>eventbridge</span>
        <span>active</span>
      </div>
      <div className="flex items-center justify-between py-1 px-1.5 text-slate-400">
        <span className="text-slate-300">dynamo_sink</span>
        <span className="text-slate-500">stream_cdc</span>
        <span className="text-slate-400">idle</span>
      </div>
      <div className="flex items-center justify-between py-1 px-1.5 text-slate-500">
        <span className="text-slate-400">bedrock_pipe</span>
        <span className="text-slate-600">async_task</span>
        <span className="text-slate-500">queued</span>
      </div>
    </div>
  )
}

function GenAIGraphic() {
  return (
    <div className="h-40 w-full flex items-center justify-center relative select-none">
      <svg className="w-40 h-32 overflow-visible" viewBox="0 0 160 128">
        {/* Outer concentric circuit squares */}
        <rect x="15" y="10" width="130" height="108" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <rect x="35" y="26" width="90" height="76" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Connection crosshairs */}
        <line x1="80" y1="10" x2="80" y2="26" stroke="#00A4E4" strokeWidth="1.5" />
        <line x1="80" y1="102" x2="80" y2="118" stroke="#00A4E4" strokeWidth="1.5" />
        <line x1="15" y1="64" x2="35" y2="64" stroke="#FF9900" strokeWidth="1.5" />
        <line x1="125" y1="64" x2="145" y2="64" stroke="#FF9900" strokeWidth="1.5" />

        {/* Central glowing FM core */}
        <rect x="58" y="44" width="44" height="40" fill="#FF9900" />
        <text x="80" y="68" fill="#0D0D0D" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">BEDROCK</text>

        {/* Corner anchor node squares */}
        <rect x="11" y="6" width="8" height="8" fill="#0D0D0D" stroke="#00A4E4" strokeWidth="1" />
        <rect x="141" y="6" width="8" height="8" fill="#0D0D0D" stroke="#00A4E4" strokeWidth="1" />
        <rect x="11" y="114" width="8" height="8" fill="#0D0D0D" stroke="#00A4E4" strokeWidth="1" />
        <rect x="141" y="114" width="8" height="8" fill="#0D0D0D" stroke="#00A4E4" strokeWidth="1" />
      </svg>
    </div>
  )
}

function DevOpsGraphic() {
  return (
    <div className="h-40 w-full flex flex-col justify-center relative select-none">
      <div className="flex items-baseline justify-between text-xs font-mono mb-2 px-1">
        <span className="text-xl font-bold text-white font-mono tracking-tight">99.98%</span>
        <span className="text-[10px] text-emerald-400 font-mono">p99 14ms</span>
      </div>
      <svg className="w-full h-24 overflow-visible px-1" viewBox="0 0 200 80">
        <defs>
          <linearGradient id="devOpsBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00A4E4" />
            <stop offset="100%" stopColor="#005580" />
          </linearGradient>
        </defs>

        {/* Background telemetry bars */}
        <rect x="10" y="40" width="16" height="35" fill="rgba(255,255,255,0.06)" />
        <rect x="42" y="32" width="16" height="43" fill="rgba(255,255,255,0.06)" />
        <rect x="74" y="24" width="16" height="51" fill="rgba(255,255,255,0.06)" />
        <rect x="106" y="8" width="16" height="67" fill="url(#devOpsBarGradient)" />
        <rect x="138" y="28" width="16" height="47" fill="rgba(255,255,255,0.06)" />
        <rect x="170" y="36" width="16" height="39" fill="rgba(255,255,255,0.06)" />

        {/* Connected metric polyline */}
        <polyline
          points="18,52 50,44 82,34 114,14 146,38 178,46"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />

        {/* Data points */}
        <circle cx="18" cy="52" r="2" fill="#38BDF8" />
        <circle cx="50" cy="44" r="2" fill="#38BDF8" />
        <circle cx="82" cy="34" r="2" fill="#38BDF8" />
        <circle cx="114" cy="14" r="3" fill="#FFFFFF" stroke="#00A4E4" strokeWidth="1.5" />
        <circle cx="146" cy="38" r="2" fill="#38BDF8" />
        <circle cx="178" cy="46" r="2" fill="#38BDF8" />
      </svg>
      <div className="flex justify-between text-[9px] font-mono text-slate-500 px-1 pt-1">
        <span>1w</span>
        <span>2w</span>
        <span>3w</span>
        <span>4w</span>
        <span>5w</span>
        <span>6w</span>
      </div>
    </div>
  )
}

const TRACKS = [
  {
    caption: "Cloud Architecture",
    graphic: MiniArchitectureVisualizer,
    lead: "Foundation first.",
    body: "Master core AWS compute, IAM policies, and VPC networking from scratch to architect resilient production systems.",
  },
  {
    caption: "Event-Driven Compute",
    graphic: ServerlessGraphic,
    lead: "Build serverless.",
    body: "Ship real event-driven microservices and Infrastructure as Code with AWS Lambda, DynamoDB, and AWS CDK.",
  },
  {
    caption: "Foundation Models",
    graphic: GenAIGraphic,
    lead: "Deploy with AI.",
    body: "Build intelligent RAG pipelines, vector search, and autonomous multi-agent systems powered by Amazon Bedrock.",
  },
  {
    caption: "Telemetry & Deployments",
    graphic: DevOpsGraphic,
    lead: "Automate everything.",
    body: "Containerize microservices with Docker, automate CI/CD pipelines, and monitor production reliability with CloudWatch.",
  },
]

export function LearningTracks() {
  return (
    <section className="py-20 sm:py-24 bg-[#0D0D0D] border-b border-white/10 relative">
      <PathwayCornerTiles />
      <Container size="lg">
        {/* Section Header */}
        <div className="relative mb-12">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <span className="w-2 h-2 bg-[#FF9900]" />
              <span>Learning Pathways</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              Hands-on tracks. Built for builders.
            </h2>
            <p className="text-slate-200 text-base sm:text-lg font-sans leading-relaxed text-pretty">
              Four focused roadmaps designed for USJ undergraduates. Move directly from fundamentals into production code.
            </p>
          </div>

        </div>

        {/* Unkey-Style Connected Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#0D0D0D]">
          {TRACKS.map((track, i) => {
            const Graphic = track.graphic
            return (
              <div
                key={track.caption}
                className={cn(
                  "p-6 sm:p-7 flex flex-col justify-between hover:bg-[#151515]/30 transition-colors group border-white/10",
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
                {/* Top Monospace Caption */}
                <div className="text-xs font-mono text-slate-300 mb-6 flex items-center justify-between font-medium">
                  <span>{track.caption}</span>
                  <span className="text-slate-500 font-mono text-[11px]">0{i + 1}</span>
                </div>

                {/* Center Technical Graphic */}
                <div className="py-2 mb-6 flex items-center justify-center">
                  <Graphic />
                </div>

                {/* Bottom Bold Lead-in & Human-Optimized Prose */}
                <div className="pt-4 border-t border-white/5 text-sm leading-relaxed">
                  <span className="font-bold text-white block mb-1.5 font-display text-base">
                    {track.lead}
                  </span>
                  <span className="text-slate-200 text-sm sm:text-[15px] font-sans leading-relaxed">
                    {track.body}
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
