"use client"

import * as React from "react"
import {
  Cloud,
  Server,
  Shield,
  Database,
  Globe,
  GitBranch,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Zap,
  RotateCcw,
  CheckCircle2,
} from "lucide-react"
import { Container } from "@/components/common/Container"
import { CircuitBoard, type CircuitNode, type CircuitConnection } from "@/components/ui/circuit-board"
import { cn } from "@/lib/utils"

type ArchitecturePatternKey =
  | "default"
  | "simple-flow"
  | "load-balancer"
  | "bidirectional"
  | "network-topology"

interface ArchitecturePatternConfig {
  key: ArchitecturePatternKey
  tabLabel: string
  title: string
  category: string
  description: string
  services: string[]
  metrics: {
    protocol: string
    latency: string
    availability: string
  }
  width: number
  height: number
  nodes: CircuitNode[]
  connections: CircuitConnection[]
}

const ARCHITECTURE_PATTERNS: Record<ArchitecturePatternKey, ArchitecturePatternConfig> = {
  default: {
    key: "default",
    tabLabel: "Default",
    title: "Event-Driven Serverless Pipeline",
    category: "Async Event Architecture",
    description:
      "Ingest high-throughput events through API Gateway, fan-out to parallel Lambda workers for compute and authentication, and aggregate verified payloads into DynamoDB.",
    services: ["Amazon API Gateway", "AWS Lambda", "Amazon EventBridge", "Amazon DynamoDB"],
    metrics: {
      protocol: "REST / WebSocket",
      latency: "< 15ms Avg",
      availability: "99.99% Multi-AZ",
    },
    width: 560,
    height: 320,
    nodes: [
      { id: "input", x: 60, y: 160, label: "Event Ingest", icon: <Cloud className="w-4 h-4" />, status: "active" },
      { id: "process1", x: 200, y: 80, label: "Lambda Worker", icon: <Cpu className="w-4 h-4" />, status: "processing" },
      { id: "process2", x: 200, y: 240, label: "Auth Validator", icon: <Shield className="w-4 h-4" />, status: "active" },
      { id: "merge", x: 360, y: 160, label: "EventBridge", icon: <GitBranch className="w-4 h-4" />, status: "active" },
      { id: "output", x: 500, y: 160, label: "DynamoDB Sink", icon: <Database className="w-4 h-4" />, status: "active" },
    ],
    connections: [
      { from: "input", to: "process1", animated: true, pulseColor: "#FF9900" },
      { from: "input", to: "process2", animated: true, pulseColor: "#00A4E4" },
      { from: "process1", to: "merge", animated: true, pulseColor: "#FF9900" },
      { from: "process2", to: "merge", animated: true, pulseColor: "#00A4E4" },
      { from: "merge", to: "output", animated: true, pulseColor: "#10B981" },
    ],
  },
  "simple-flow": {
    key: "simple-flow",
    tabLabel: "Simple Flow",
    title: "Cloud Compute & Shield Pipeline",
    category: "Tiered Cloud Ingest",
    description:
      "Client traffic routed through server compute nodes, verified concurrently by AWS Shield and WAF security layers, before committing transactional state to Aurora Database.",
    services: ["Amazon CloudFront", "Amazon EC2", "AWS Shield Advanced", "Amazon Aurora"],
    metrics: {
      protocol: "HTTPS / TLS 1.3",
      latency: "28ms End-to-End",
      availability: "99.95% SLA",
    },
    width: 560,
    height: 320,
    nodes: [
      { id: "start", x: 80, y: 160, label: "Cloud Ingest", icon: <Cloud className="w-4 h-4" />, status: "active" },
      { id: "process", x: 260, y: 80, label: "Server Compute", icon: <Server className="w-4 h-4" />, status: "processing" },
      { id: "validate", x: 260, y: 240, label: "AWS Shield", icon: <Shield className="w-4 h-4" />, status: "active" },
      { id: "end", x: 460, y: 160, label: "Aurora Database", icon: <Database className="w-4 h-4" />, status: "active" },
    ],
    connections: [
      { from: "start", to: "process", animated: true, pulseColor: "#FF9900" },
      { from: "start", to: "validate", animated: true, pulseColor: "#00A4E4" },
      { from: "process", to: "end", animated: true, pulseColor: "#FF9900" },
      { from: "validate", to: "end", animated: true, pulseColor: "#10B981" },
    ],
  },
  "load-balancer": {
    key: "load-balancer",
    tabLabel: "Load Balancer",
    title: "Elastic Traffic Distribution",
    category: "High Availability Web Tier",
    description:
      "Application Load Balancer intelligently distributing incoming traffic across auto-scaling application clusters, with zero downtime and automatic multi-AZ failover.",
    services: ["AWS Application Load Balancer", "Auto Scaling Groups", "Amazon Route 53", "RDS Multi-AZ"],
    metrics: {
      protocol: "HTTP/2 & gRPC",
      latency: "4ms Routing Delay",
      availability: "99.999% Reliability",
    },
    width: 560,
    height: 320,
    nodes: [
      { id: "user", x: 60, y: 160, label: "Global Users", icon: <Globe className="w-4 h-4" />, status: "active" },
      { id: "lb", x: 180, y: 160, label: "Application LB", icon: <GitBranch className="w-4 h-4" />, status: "active", size: "lg" },
      { id: "api1", x: 320, y: 80, label: "API Cluster A", icon: <Server className="w-4 h-4" />, status: "processing" },
      { id: "api2", x: 320, y: 240, label: "API Cluster B", icon: <Server className="w-4 h-4" />, status: "active" },
      { id: "db", x: 480, y: 160, label: "Multi-AZ DB", icon: <Database className="w-4 h-4" />, status: "active" },
    ],
    connections: [
      { from: "user", to: "lb", animated: true, pulseColor: "#FF9900" },
      { from: "lb", to: "api1", animated: true, pulseColor: "#00A4E4" },
      { from: "lb", to: "api2", animated: true, pulseColor: "#00A4E4" },
      { from: "api1", to: "db", animated: true, pulseColor: "#10B981" },
      { from: "api2", to: "db", animated: true, pulseColor: "#10B981" },
    ],
  },
  bidirectional: {
    key: "bidirectional",
    tabLabel: "Bidirectional",
    title: "Memory & Cache Bus Sync",
    category: "In-Memory Data Pipeline",
    description:
      "Two-way synchronous data pipeline connecting Graviton compute engines, Redis in-memory cache, and Amazon S3 persistent storage for real-time reads and writes.",
    services: ["AWS Graviton3", "Amazon ElastiCache Redis", "Amazon S3", "AWS Direct Connect"],
    metrics: {
      protocol: "TCP Binary / RESP",
      latency: "< 1ms Sub-Millisecond",
      availability: "Synchronous Replication",
    },
    width: 560,
    height: 280,
    nodes: [
      { id: "cpu", x: 90, y: 130, label: "Graviton Compute", icon: <Cpu className="w-4 h-4" />, status: "active" },
      { id: "ram", x: 280, y: 130, label: "ElastiCache RAM", icon: <HardDrive className="w-4 h-4" />, status: "processing", size: "lg" },
      { id: "storage", x: 470, y: 130, label: "Persistent S3", icon: <Database className="w-4 h-4" />, status: "active" },
    ],
    connections: [
      { from: "cpu", to: "ram", bidirectional: true, animated: true, pulseColor: "#FF9900" },
      { from: "ram", to: "storage", bidirectional: true, animated: true, pulseColor: "#00A4E4" },
    ],
  },
  "network-topology": {
    key: "network-topology",
    tabLabel: "Network Topology",
    title: "VPC Multi-Subnet Architecture",
    category: "Cloud Virtual Private Network",
    description:
      "Segmented Amazon VPC topology routing isolated traffic from an Internet Gateway across multiple private Availability Zone subnets hosting EC2, EKS, and ECS clusters.",
    services: ["Amazon VPC", "AWS Transit Gateway", "Amazon EKS", "Amazon ECS"],
    metrics: {
      protocol: "VPC CIDR / 10.0.0.0/16",
      latency: "Local Zone Routing",
      availability: "Triple Availability Zone",
    },
    width: 560,
    height: 320,
    nodes: [
      { id: "router", x: 280, y: 70, label: "VPC Gateway", icon: <Wifi className="w-4 h-4" />, status: "active", size: "lg" },
      { id: "server1", x: 100, y: 230, label: "Subnet 1A (EC2)", icon: <Server className="w-4 h-4" />, status: "active" },
      { id: "server2", x: 280, y: 230, label: "Subnet 1B (EKS)", icon: <Server className="w-4 h-4" />, status: "processing" },
      { id: "server3", x: 460, y: 230, label: "Subnet 1C (ECS)", icon: <Server className="w-4 h-4" />, status: "active" },
    ],
    connections: [
      { from: "router", to: "server1", animated: true, pulseColor: "#FF9900" },
      { from: "router", to: "server2", animated: true, pulseColor: "#00A4E4" },
      { from: "router", to: "server3", animated: true, pulseColor: "#10B981" },
    ],
  },
}

export function CloudArchitectureVisualizer() {
  const [activePatternKey, setActivePatternKey] =
    React.useState<ArchitecturePatternKey>("default")
  const [showGrid, setShowGrid] = React.useState(true)
  const [speedMultiplier, setSpeedMultiplier] = React.useState<"normal" | "turbo">("normal")
  const [refreshKey, setRefreshKey] = React.useState(0)

  const activePattern = ARCHITECTURE_PATTERNS[activePatternKey]
  const pulseSpeed = speedMultiplier === "turbo" ? 1.1 : 2.0

  const handleReset = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <section className="py-20 bg-[#0A0E17] border-b border-white/10 relative overflow-hidden">
      <Container size="lg">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF9900]" />
              <span className="text-xs font-mono font-bold text-[#FF9900] tracking-widest uppercase">
                Interactive Systems Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Cloud Topologies in Action
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed text-pretty">
              Explore the core architectural patterns USJ student builders design, simulate, and deploy.
              Switch between 5 live topologies to inspect data pipelines, load balancers, and network flows.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[#161F2E] border border-white/15 text-slate-300 rounded-none">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Pulse</span>
            </span>
          </div>
        </div>

        {/* The Single Unified Card */}
        <div className="bg-[#161F2E] border border-white/10 rounded-none relative overflow-hidden shadow-2xl">
          {/* Card Top Navigation & Mode Switcher Bar */}
          <div className="border-b border-white/10 bg-[#0A0E17]/60 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Pattern Identification */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#FF9900]/10 border border-[#FF9900]/40 flex items-center justify-center text-[#FF9900] rounded-none shrink-0 font-mono text-xs font-bold">
                0{Object.keys(ARCHITECTURE_PATTERNS).indexOf(activePatternKey) + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    {activePattern.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-[#FF9900] rounded-none hidden sm:inline-block">
                    {activePattern.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Segmented Pattern Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {(Object.keys(ARCHITECTURE_PATTERNS) as ArchitecturePatternKey[]).map((key) => {
                const item = ARCHITECTURE_PATTERNS[key]
                const isActive = activePatternKey === key
                return (
                  <button
                    key={key}
                    onClick={() => setActivePatternKey(key)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-mono transition-all rounded-none shrink-0 border",
                      isActive
                        ? "bg-[#FF9900] text-[#0A0E17] font-bold border-[#FF9900] shadow-sm"
                        : "bg-[#0A0E17]/80 text-slate-300 border-white/10 hover:border-white/30 hover:text-white"
                    )}
                  >
                    {item.tabLabel}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Educational Pattern Description & AWS Services Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-[#161F2E]/80">
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4 max-w-4xl">
              {activePattern.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
                AWS Services:
              </span>
              {activePattern.services.map((service) => (
                <span
                  key={service}
                  className="text-xs font-mono px-2.5 py-0.5 bg-[#0A0E17] border border-white/15 text-slate-200 rounded-none inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#FF9900]" />
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* The Circuit Board Interactive Canvas */}
          <div className="relative p-4 sm:p-8 bg-[#0A0E17] flex items-center justify-center overflow-x-auto min-h-[380px]">
            <CircuitBoard
              key={`${activePatternKey}-${refreshKey}-${speedMultiplier}-${showGrid}`}
              nodes={activePattern.nodes}
              connections={activePattern.connections}
              width={activePattern.width}
              height={activePattern.height}
              showGrid={showGrid}
              pulseSpeed={pulseSpeed}
              traceWidth={2}
              className="mx-auto"
            />
          </div>

          {/* Card Bottom Controls & Telemetry Bar */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0A0E17]/90 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            {/* Architecture Metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div>
                <span className="text-slate-500 uppercase">Protocol:</span>{" "}
                <span className="text-slate-200">{activePattern.metrics.protocol}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase">Latency:</span>{" "}
                <span className="text-[#FF9900]">{activePattern.metrics.latency}</span>
              </div>
              <div className="hidden sm:inline-block">
                <span className="text-slate-500 uppercase">Redundancy:</span>{" "}
                <span className="text-emerald-400">{activePattern.metrics.availability}</span>
              </div>
            </div>

            {/* Interactive Control Toggles */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-mono border transition-all rounded-none",
                  showGrid
                    ? "border-white/30 text-white bg-white/5"
                    : "border-white/10 text-slate-400 hover:text-white"
                )}
                title="Toggle Background Grid"
              >
                Grid: {showGrid ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => setSpeedMultiplier(speedMultiplier === "normal" ? "turbo" : "normal")}
                className={cn(
                  "px-2.5 py-1 text-[11px] font-mono border transition-all rounded-none inline-flex items-center gap-1",
                  speedMultiplier === "turbo"
                    ? "border-[#FF9900] text-[#FF9900] bg-[#FF9900]/10"
                    : "border-white/10 text-slate-400 hover:text-white"
                )}
                title="Adjust Signal Transmission Speed"
              >
                <Zap className="w-3 h-3" />
                {speedMultiplier === "turbo" ? "Turbo 1x" : "Normal"}
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all rounded-none"
                title="Replay Animation"
                aria-label="Replay animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
