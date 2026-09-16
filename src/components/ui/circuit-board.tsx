"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface CircuitNode {
  id: string
  x: number
  y: number
  label?: string
  icon?: React.ReactNode
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
}

export interface CircuitConnection {
  from: string
  to: string
  animated?: boolean
  bidirectional?: boolean
  color?: string
  pulseColor?: string
}

export interface CircuitBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: CircuitNode[]
  connections: CircuitConnection[]
  width?: number
  height?: number
  gridSize?: number
  showGrid?: boolean
  gridColor?: string
  traceColor?: string
  pulseColor?: string
  nodeColor?: string
  pulseSpeed?: number
  traceWidth?: number
  /** Compact miniature layout for dashboard cards */
  compact?: boolean
  /** Force a specific theme variant. Defaults to auto-detect from system. */
  variant?: "light" | "dark" | "auto"
}

export function CircuitBoard({
  nodes,
  connections,
  width = 600,
  height = 360,
  gridSize = 20,
  showGrid = true,
  gridColor,
  traceColor,
  pulseColor,
  nodeColor,
  pulseSpeed = 2,
  traceWidth = 2,
  compact = false,
  variant = "auto",
  className,
  ...props
}: CircuitBoardProps) {
  // Theme-aware color defaults with SSR safety
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    if (variant !== "auto") {
      setIsDark(variant === "dark")
      return
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      return
    }

    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      setIsDark(Boolean(isDarkMode))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", checkTheme)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener("change", checkTheme)
    }
  }, [variant])

  // Compute theme-aware colors matching AWS SBG Theme
  const computedGridColor = gridColor || (isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(64, 64, 64, 0.12)")
  const computedTraceColor = traceColor || (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(64, 64, 64, 0.35)")
  const computedPulseColor = pulseColor || (isDark ? "#FF9900" : "#D97706")
  const computedNodeColor = nodeColor || (isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(64, 64, 64, 0.6)")

  const nodeMap = React.useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]))
  }, [nodes])

  const getNodeSize = React.useCallback(
    (size?: CircuitNode["size"]) => {
      if (compact) {
        switch (size) {
          case "sm":
            return 20
          case "lg":
            return 32
          default:
            return 26
        }
      }
      switch (size) {
        case "sm":
          return 28
        case "lg":
          return 48
        default:
          return 38
      }
    },
    [compact]
  )

  const calculatePath = React.useCallback(
    (from: CircuitNode, to: CircuitNode): string => {
      const offset = compact ? 2 : 4
      const fromSize = getNodeSize(from.size) / 2 + offset
      const toSize = getNodeSize(to.size) / 2 + offset

      const dx = to.x - from.x
      const dy = to.y - from.y

      // Calculate start and end points offset from node centers
      let startX = from.x
      let startY = from.y
      let endX = to.x
      let endY = to.y

      // Create circuit-like paths with right angles
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal first, then vertical
        startX = from.x + (dx > 0 ? fromSize : -fromSize)
        endX = to.x + (dx > 0 ? -toSize : toSize)
        const midX = from.x + dx / 2
        return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`
      } else {
        // Vertical first, then horizontal
        startY = from.y + (dy > 0 ? fromSize : -fromSize)
        endY = to.y + (dy > 0 ? -toSize : toSize)
        const midY = from.y + dy / 2
        return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`
      }
    },
    [getNodeSize]
  )

  const getStatusColor = (status?: CircuitNode["status"]) => {
    if (isDark) {
      switch (status) {
        case "active":
          return "#FF9900" // AWS Builder Orange
        case "processing":
          return "#00A4E4" // AWS Cyan / Sky
        case "error":
          return "#EF4444" // Crimson
        default:
          return computedNodeColor
      }
    } else {
      switch (status) {
        case "active":
          return "#D97706"
        case "processing":
          return "#0284C7"
        case "error":
          return "#DC2626"
        default:
          return computedNodeColor
      }
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full max-w-full flex items-center justify-center select-none",
        className
      )}
      style={{ minHeight: height }}
      {...props}
    >
      <div className="relative" style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow filter for the pulse effect */}
            <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Grid pattern */}
            {showGrid && (
              <pattern
                id="circuitGrid"
                width={gridSize}
                height={gridSize}
                patternUnits="userSpaceOnUse"
              >
                <circle cx={gridSize / 2} cy={gridSize / 2} r="0.75" fill={computedGridColor} />
              </pattern>
            )}

            {/* Animated gradient for electricity effect */}
            {connections.map((conn, i) => (
              <linearGradient
                key={`gradient-${i}`}
                id={`electricGradient-${i}`}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="transparent" />
                <stop offset="50%" stopColor={conn.pulseColor || computedPulseColor} />
                <stop offset="60%" stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid background */}
          {showGrid && (
            <rect width={width} height={height} fill="url(#circuitGrid)" />
          )}

          {/* Connection traces */}
          {connections.map((conn, i) => {
            const fromNode = nodeMap.get(conn.from)
            const toNode = nodeMap.get(conn.to)
            if (!fromNode || !toNode) return null

            const path = calculatePath(fromNode, toNode)
            const pathLength = 500 // Approximate path length for animation

            return (
              <g key={`connection-${i}`}>
                {/* Base trace */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.color || computedTraceColor}
                  strokeWidth={traceWidth}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                />

                {/* Animated electricity pulse */}
                {conn.animated !== false && (
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={conn.pulseColor || computedPulseColor}
                    strokeWidth={traceWidth + 1.5}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    filter="url(#circuitGlow)"
                    strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                    initial={{ strokeDashoffset: pathLength }}
                    animate={{ strokeDashoffset: -pathLength }}
                    transition={{
                      duration: pulseSpeed,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.25,
                    }}
                  />
                )}

                {/* Bidirectional pulse */}
                {conn.bidirectional && (
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={conn.pulseColor || computedPulseColor}
                    strokeWidth={traceWidth + 1.5}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    filter="url(#circuitGlow)"
                    strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
                    initial={{ strokeDashoffset: -pathLength }}
                    animate={{ strokeDashoffset: pathLength }}
                    transition={{
                      duration: pulseSpeed,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.25 + pulseSpeed / 2,
                    }}
                  />
                )}
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const size = getNodeSize(node.size)
          const statusColor = getStatusColor(node.status)

          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center justify-center rounded-none bg-[#0A0E17]/95 border z-20 group cursor-pointer"
              style={{
                left: node.x - size / 2,
                top: node.y - size / 2,
                width: size,
                height: size,
                borderColor: statusColor,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 + 0.3, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.08 }}
            >
              {/* Subtle background pulse */}
              <motion.div
                className="absolute inset-0 rounded-none pointer-events-none"
                style={{ backgroundColor: statusColor }}
                animate={
                  node.status === "processing"
                    ? { opacity: [0.15, 0.35, 0.15] }
                    : { opacity: 0.12 }
                }
                transition={
                  node.status === "processing"
                    ? { duration: 1.5, repeat: Infinity }
                    : {}
                }
              />

              {/* Active / processing glow */}
              {node.status === "active" && (
                <motion.div
                  className="absolute inset-0 rounded-none pointer-events-none"
                  style={{
                    boxShadow: `0 0 16px ${statusColor}50, inset 0 0 8px ${statusColor}25`,
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Error pulse */}
              {node.status === "error" && (
                <motion.div
                  className="absolute inset-0 rounded-none pointer-events-none"
                  style={{
                    boxShadow: `0 0 16px ${statusColor}70, inset 0 0 8px ${statusColor}40`,
                  }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}

              {/* Node Icon */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center",
                  compact && "[&>svg]:w-3 [&>svg]:h-3"
                )}
                style={{ color: statusColor }}
              >
                {node.icon}
              </div>

              {/* Node Label */}
              {node.label && (
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono tracking-tight font-medium bg-[#0A0E17]/90 border border-white/10 rounded-none text-slate-300 pointer-events-none transition-colors group-hover:text-white group-hover:border-white/25",
                    compact
                      ? "-bottom-5 text-[9px] px-1 py-0 leading-tight"
                      : "-bottom-6 text-[11px] px-1.5 py-0.5"
                  )}
                >
                  {node.label}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Pre-built circuit patterns
export interface CircuitPatternProps extends Omit<CircuitBoardProps, "nodes" | "connections"> {
  pattern: "data-flow" | "network" | "processor" | "tree"
}

export function CircuitPattern({ pattern, ...props }: CircuitPatternProps) {
  const patterns = {
    "data-flow": {
      nodes: [
        { id: "input", x: 50, y: 180, label: "Input", status: "active" as const },
        { id: "process1", x: 180, y: 90, label: "Process", status: "processing" as const },
        { id: "process2", x: 180, y: 270, label: "Validate", status: "active" as const },
        { id: "merge", x: 360, y: 180, label: "Merge", status: "active" as const },
        { id: "output", x: 500, y: 180, label: "Output", status: "active" as const },
      ],
      connections: [
        { from: "input", to: "process1", animated: true },
        { from: "input", to: "process2", animated: true },
        { from: "process1", to: "merge", animated: true },
        { from: "process2", to: "merge", animated: true },
        { from: "merge", to: "output", animated: true },
      ],
    },
    network: {
      nodes: [
        { id: "server", x: 280, y: 70, label: "VPC Gateway", status: "active" as const, size: "lg" as const },
        { id: "client1", x: 90, y: 190, label: "Subnet A", status: "active" as const },
        { id: "client2", x: 280, y: 240, label: "Subnet B", status: "processing" as const },
        { id: "client3", x: 470, y: 190, label: "Subnet C", status: "active" as const },
        { id: "db", x: 280, y: 320, label: "Aurora DB", status: "active" as const },
      ],
      connections: [
        { from: "server", to: "client1", bidirectional: true },
        { from: "server", to: "client2", bidirectional: true },
        { from: "server", to: "client3", bidirectional: true },
        { from: "server", to: "db", bidirectional: true },
      ],
    },
    processor: {
      nodes: [
        { id: "alu", x: 280, y: 180, label: "ALU Graviton", status: "processing" as const, size: "lg" as const },
        { id: "reg1", x: 130, y: 90, label: "R1", status: "active" as const, size: "sm" as const },
        { id: "reg2", x: 130, y: 180, label: "R2", status: "active" as const, size: "sm" as const },
        { id: "reg3", x: 130, y: 270, label: "R3", status: "active" as const, size: "sm" as const },
        { id: "cache", x: 420, y: 180, label: "L1 Cache", status: "active" as const },
        { id: "out", x: 530, y: 180, label: "Bus Out", status: "active" as const, size: "sm" as const },
      ],
      connections: [
        { from: "reg1", to: "alu", animated: true },
        { from: "reg2", to: "alu", animated: true },
        { from: "reg3", to: "alu", animated: true },
        { from: "alu", to: "cache", animated: true },
        { from: "cache", to: "out", animated: true },
      ],
    },
    tree: {
      nodes: [
        { id: "root", x: 280, y: 50, label: "Root VPC", status: "active" as const },
        { id: "l1", x: 140, y: 140, label: "Public AZ1", status: "active" as const },
        { id: "r1", x: 420, y: 140, label: "Public AZ2", status: "processing" as const },
        { id: "l1l", x: 70, y: 260, label: "ECS Pod 1", status: "active" as const, size: "sm" as const },
        { id: "l1r", x: 210, y: 260, label: "ECS Pod 2", status: "active" as const, size: "sm" as const },
        { id: "r1l", x: 350, y: 260, label: "EKS Pod 1", status: "error" as const, size: "sm" as const },
        { id: "r1r", x: 490, y: 260, label: "EKS Pod 2", status: "active" as const, size: "sm" as const },
      ],
      connections: [
        { from: "root", to: "l1", animated: true },
        { from: "root", to: "r1", animated: true },
        { from: "l1", to: "l1l", animated: true },
        { from: "l1", to: "l1r", animated: true },
        { from: "r1", to: "r1l", animated: true },
        { from: "r1", to: "r1r", animated: true },
      ],
    },
  }

  const selectedPattern = patterns[pattern]
  return <CircuitBoard nodes={selectedPattern.nodes} connections={selectedPattern.connections} {...props} />
}

// Standalone Circuit Node component
export interface CircuitNodeComponentProps {
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
  glowColor?: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function CircuitNode({
  status = "inactive",
  size = "md",
  glowColor,
  children,
  className,
  onClick,
}: CircuitNodeComponentProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  }

  const statusColors = {
    active: "#FF9900",
    inactive: "rgba(255, 255, 255, 0.2)",
    processing: "#00A4E4",
    error: "#EF4444",
  }

  const color = glowColor || statusColors[status]

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center rounded-none border bg-[#0A0E17]/95",
        sizeClasses[size],
        className
      )}
      style={{ borderColor: color }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {status === "processing" && (
        <motion.div
          className="absolute inset-0 rounded-none pointer-events-none"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {status === "active" && (
        <div
          className="absolute inset-0 rounded-none pointer-events-none"
          style={{
            boxShadow: `0 0 16px ${color}50, inset 0 0 8px ${color}25`,
          }}
        />
      )}

      {status === "error" && (
        <motion.div
          className="absolute inset-0 rounded-none pointer-events-none"
          style={{ boxShadow: `0 0 16px ${color}70` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex items-center justify-center" style={{ color }}>
        {children}
      </div>
    </motion.div>
  )
}

// Standalone Circuit Trace component
export interface CircuitTraceProps {
  path: string
  animated?: boolean
  color?: string
  pulseColor?: string
  width?: number
  pulseSpeed?: number
}

export function CircuitTrace({
  path,
  animated = true,
  color,
  pulseColor,
  width = 2,
  pulseSpeed = 2,
}: CircuitTraceProps) {
  const computedColor = color || "rgba(255, 255, 255, 0.15)"
  const computedPulseColor = pulseColor || "#FF9900"
  const pathLength = 500

  return (
    <svg className="absolute inset-0 overflow-visible pointer-events-none">
      <defs>
        <filter id="standaloneTraceGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={path}
        fill="none"
        stroke={computedColor}
        strokeWidth={width}
        strokeLinecap="square"
        strokeLinejoin="miter"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {animated && (
        <motion.path
          d={path}
          fill="none"
          stroke={computedPulseColor}
          strokeWidth={width + 1.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
          filter="url(#standaloneTraceGlow)"
          strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: -pathLength }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </svg>
  )
}
