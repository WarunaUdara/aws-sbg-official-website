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
} from "lucide-react"
import { CircuitBoard, type CircuitNode, type CircuitConnection } from "@/components/ui/circuit-board"
import { cn } from "@/lib/utils"

export type ArchitecturePatternKey =
  | "default"
  | "simple-flow"
  | "load-balancer"
  | "bidirectional"
  | "network-topology"

interface MiniPatternConfig {
  key: ArchitecturePatternKey
  tabLabel: string
  nodes: CircuitNode[]
  connections: CircuitConnection[]
}

const PATTERNS: MiniPatternConfig[] = [
  {
    key: "default",
    tabLabel: "Default",
    nodes: [
      { id: "input", x: 40, y: 58, label: "Event Ingest", icon: <Cloud className="w-3.5 h-3.5" />, status: "active" },
      { id: "process1", x: 140, y: 28, label: "Lambda", icon: <Cpu className="w-3.5 h-3.5" />, status: "processing" },
      { id: "process2", x: 140, y: 88, label: "Auth", icon: <Shield className="w-3.5 h-3.5" />, status: "active" },
      { id: "merge", x: 238, y: 58, label: "EventBridge", icon: <GitBranch className="w-3.5 h-3.5" />, status: "active" },
      { id: "output", x: 320, y: 58, label: "DynamoDB", icon: <Database className="w-3.5 h-3.5" />, status: "active" },
    ],
    connections: [
      { from: "input", to: "process1", animated: true, pulseColor: "#FF9900" },
      { from: "input", to: "process2", animated: true, pulseColor: "#00A4E4" },
      { from: "process1", to: "merge", animated: true, pulseColor: "#FF9900" },
      { from: "process2", to: "merge", animated: true, pulseColor: "#00A4E4" },
      { from: "merge", to: "output", animated: true, pulseColor: "#10B981" },
    ],
  },
  {
    key: "simple-flow",
    tabLabel: "Simple Flow",
    nodes: [
      { id: "start", x: 45, y: 58, label: "Cloud Ingest", icon: <Cloud className="w-3.5 h-3.5" />, status: "active" },
      { id: "process", x: 180, y: 28, label: "EC2 Server", icon: <Server className="w-3.5 h-3.5" />, status: "processing" },
      { id: "validate", x: 180, y: 88, label: "AWS Shield", icon: <Shield className="w-3.5 h-3.5" />, status: "active" },
      { id: "end", x: 315, y: 58, label: "Aurora DB", icon: <Database className="w-3.5 h-3.5" />, status: "active" },
    ],
    connections: [
      { from: "start", to: "process", animated: true, pulseColor: "#FF9900" },
      { from: "start", to: "validate", animated: true, pulseColor: "#00A4E4" },
      { from: "process", to: "end", animated: true, pulseColor: "#FF9900" },
      { from: "validate", to: "end", animated: true, pulseColor: "#10B981" },
    ],
  },
  {
    key: "load-balancer",
    tabLabel: "Load Balancer",
    nodes: [
      { id: "user", x: 38, y: 58, label: "Users", icon: <Globe className="w-3.5 h-3.5" />, status: "active" },
      { id: "lb", x: 118, y: 58, label: "ALB", icon: <GitBranch className="w-3.5 h-3.5" />, status: "active", size: "lg" },
      { id: "api1", x: 220, y: 28, label: "Cluster A", icon: <Server className="w-3.5 h-3.5" />, status: "processing" },
      { id: "api2", x: 220, y: 88, label: "Cluster B", icon: <Server className="w-3.5 h-3.5" />, status: "active" },
      { id: "db", x: 322, y: 58, label: "Multi-AZ DB", icon: <Database className="w-3.5 h-3.5" />, status: "active" },
    ],
    connections: [
      { from: "user", to: "lb", animated: true, pulseColor: "#FF9900" },
      { from: "lb", to: "api1", animated: true, pulseColor: "#00A4E4" },
      { from: "lb", to: "api2", animated: true, pulseColor: "#00A4E4" },
      { from: "api1", to: "db", animated: true, pulseColor: "#10B981" },
      { from: "api2", to: "db", animated: true, pulseColor: "#10B981" },
    ],
  },
  {
    key: "bidirectional",
    tabLabel: "Bidirectional",
    nodes: [
      { id: "cpu", x: 55, y: 58, label: "Graviton", icon: <Cpu className="w-3.5 h-3.5" />, status: "active" },
      { id: "ram", x: 180, y: 58, label: "ElastiCache", icon: <HardDrive className="w-3.5 h-3.5" />, status: "processing", size: "lg" },
      { id: "storage", x: 305, y: 58, label: "Persistent S3", icon: <Database className="w-3.5 h-3.5" />, status: "active" },
    ],
    connections: [
      { from: "cpu", to: "ram", bidirectional: true, animated: true, pulseColor: "#FF9900" },
      { from: "ram", to: "storage", bidirectional: true, animated: true, pulseColor: "#00A4E4" },
    ],
  },
  {
    key: "network-topology",
    tabLabel: "Network Topology",
    nodes: [
      { id: "router", x: 180, y: 26, label: "VPC Gateway", icon: <Wifi className="w-3.5 h-3.5" />, status: "active", size: "lg" },
      { id: "server1", x: 55, y: 88, label: "Subnet 1A", icon: <Server className="w-3.5 h-3.5" />, status: "active" },
      { id: "server2", x: 180, y: 88, label: "Subnet 1B", icon: <Server className="w-3.5 h-3.5" />, status: "processing" },
      { id: "server3", x: 305, y: 88, label: "Subnet 1C", icon: <Server className="w-3.5 h-3.5" />, status: "active" },
    ],
    connections: [
      { from: "router", to: "server1", animated: true, pulseColor: "#FF9900" },
      { from: "router", to: "server2", animated: true, pulseColor: "#00A4E4" },
      { from: "router", to: "server3", animated: true, pulseColor: "#10B981" },
    ],
  },
]

export function MiniArchitectureVisualizer() {
  const [activeIdx, setActiveIdx] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0.85)

  // Auto-cycle through the 5 diagrams on a continuous loop
  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PATTERNS.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [isPaused])

  // Measure card container and auto-scale gracefully
  React.useEffect(() => {
    if (!containerRef.current) return
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        // 360px is the native design width for the mini circuit board
        const computedScale = Math.min((width - 4) / 360, 0.95)
        setScale(Math.max(0.68, computedScale))
      }
    }
    updateScale()
    const ro = new ResizeObserver(updateScale)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const currentPattern = PATTERNS[activeIdx]

  return (
    <div
      className="h-40 w-full flex flex-col justify-between select-none relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Micro-Bar: Current Topology Name + Pagination Indicators */}
      <div className="flex items-center justify-between px-0.5 text-[10px] font-mono leading-none pb-1.5 border-b border-white/5">
        <div className="flex items-center gap-1.5 font-semibold text-slate-300">
          <span className="w-1.5 h-1.5 bg-[#FF9900] animate-pulse" />
          <span className="text-[#FF9900] tracking-wide">{currentPattern.tabLabel}</span>
        </div>

        {/* 5-step interactive pagination dashes */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Cloud topologies">
          {PATTERNS.map((p, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={p.key}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setActiveIdx(idx)
                }}
                className={cn(
                  "h-1 transition-[width,background-color] duration-300 rounded-none cursor-pointer",
                  isActive
                    ? "bg-[#FF9900] w-3.5"
                    : "bg-white/20 hover:bg-white/40 w-1.5"
                )}
                aria-label={`Switch to ${p.tabLabel} topology`}
                title={p.tabLabel}
              />
            )
          })}
        </div>
      </div>

      {/* Scaled Miniature Animated Diagram */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex items-center justify-center relative overflow-hidden"
      >
        <div
          style={{
            width: 360,
            height: 125,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          className="shrink-0 flex items-center justify-center pointer-events-none"
        >
          <CircuitBoard
            key={currentPattern.key}
            nodes={currentPattern.nodes}
            connections={currentPattern.connections}
            width={360}
            height={125}
            gridSize={16}
            showGrid={true}
            pulseSpeed={1.8}
            traceWidth={1.8}
            compact={true}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
