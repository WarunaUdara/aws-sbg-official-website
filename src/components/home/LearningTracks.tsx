import { Link } from "@tanstack/react-router"
import { Layers, Server, Sparkles, Terminal, ArrowRight, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/common/Container"
import { Badge } from "@/components/ui/badge"

const LEARNING_TRACKS = [
  {
    number: "01",
    title: "Cloud Foundations & Architecture",
    level: "Beginner",
    description: "Master cloud fundamentals, IAM security, high-availability VPC networks, and scalable storage on AWS.",
    icon: Layers,
    topics: ["IAM & Security Policies", "Amazon EC2 & Auto Scaling", "Amazon S3 Storage Tiers", "VPC & Subnet Networking"],
    targetCert: "AWS Certified Cloud Practitioner",
    badge: "Foundation",
  },
  {
    number: "02",
    title: "Serverless & Full-Stack Cloud Apps",
    level: "Intermediate",
    description: "Build event-driven microservices and Infrastructure as Code with AWS Lambda, DynamoDB, and AWS CDK.",
    icon: Server,
    topics: ["AWS Lambda & EventBridge", "DynamoDB Single-Table Design", "Amazon API Gateway", "AWS CDK (TypeScript & Python)"],
    targetCert: "AWS Certified Developer Associate",
    badge: "Builder",
  },
  {
    number: "03",
    title: "Generative AI with Amazon Bedrock",
    level: "Intermediate to Advanced",
    description: "Build RAG pipelines, multi-agent workflows, and secure foundation model apps with Amazon Bedrock.",
    icon: Sparkles,
    topics: ["Amazon Bedrock & Knowledge Bases", "Vector Databases & OpenSearch", "Prompt Engineering & Guardrails", "Multi-Agent Workflows"],
    targetCert: "AWS Certified AI Practitioner",
    badge: "GenAI",
  },
  {
    number: "04",
    title: "Cloud DevOps & Modern CI/CD",
    level: "Advanced",
    description: "Automate container deployments and observability with AWS Fargate, GitHub Actions, and Amazon CloudWatch.",
    icon: Terminal,
    topics: ["Amazon ECS & AWS Fargate", "GitHub Actions CI/CD", "CloudWatch Metrics & Logs", "Route 53 DNS & Domains"],
    targetCert: "AWS Certified Solutions Architect",
    badge: "DevOps",
  },
]

export function LearningTracks() {
  return (
    <section className="py-20 sm:py-24 bg-[#0A0E17] border-b border-white/10 relative">
      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <span className="w-2 h-2 bg-[#FF9900]" />
              <span>Learning Pathways</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
              Hands-On Learning Tracks
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed text-pretty">
              Structured technical roadmaps designed for USJ undergraduates. Move from fundamentals directly into production code.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#161F2E] border border-white/15 hover:border-[#FF9900]/60 text-xs font-mono text-white transition-all w-fit rounded-none"
          >
            <span>View Workshop Schedule</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF9900]" />
          </Link>
        </div>

        {/* 4-Card Track Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEARNING_TRACKS.map((track) => {
            const Icon = track.icon
            return (
              <div
                key={track.number}
                className="p-6 sm:p-8 bg-[#111827] border border-white/10 hover:border-[#FF9900]/50 transition-all duration-300 flex flex-col justify-between group rounded-none relative"
              >
                <div>
                  {/* Top Track Header */}
                  <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#FF9900]">
                        Track {track.number}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {track.level}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono rounded-none border-white/15 text-slate-300">
                      {track.badge}
                    </Badge>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-[#0A0E17] border border-[#FF9900]/30 text-[#FF9900] shrink-0 group-hover:border-[#FF9900] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-display group-hover:text-[#FF9900] transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-1">
                        Target: {track.targetCert}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Key Technologies Pill Grid */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Key Topics:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {track.topics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-center gap-2 text-xs font-sans text-slate-300 bg-[#0A0E17] px-2.5 py-1.5 border border-white/5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9900] shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Hands-on Labs & Study Cohorts
                  </span>
                  <Link
                    to="/contact"
                    className="text-[#FF9900] hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Join Cohort</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
