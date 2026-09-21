import * as React from "react"

export interface CloudServiceIcon {
  slug: string
  label: string
  x: number // resting horizontal percentage [0..100]
  y: number // resting vertical percentage [0..100]
  rotation: number // resting rotation in degrees
  mobile: boolean // whether shown on small mobile displays
}

export const CLOUD_SERVICE_ICONS: CloudServiceIcon[] = [
  // ==========================================
  // ZONE 1: TOP (above the central CTA card)
  // ==========================================
  { slug: "amazon-s3", label: "Amazon S3", x: 14, y: 12, rotation: 6, mobile: true },
  { slug: "aws-lambda", label: "AWS Lambda", x: 32, y: 16, rotation: -8, mobile: true },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", x: 50, y: 8, rotation: 4, mobile: false },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", x: 68, y: 15, rotation: -6, mobile: true },
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", x: 86, y: 11, rotation: 7, mobile: true },

  // ==========================================
  // ZONE 2: LEFT (to the left of central card)
  // ==========================================
  { slug: "amazon-ec2", label: "Amazon EC2", x: 7, y: 30, rotation: -9, mobile: true },
  { slug: "amazon-vpc", label: "Amazon VPC", x: 20, y: 38, rotation: 8, mobile: false },
  { slug: "amazon-aurora", label: "Amazon Aurora", x: 8, y: 52, rotation: -5, mobile: false },
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", x: 21, y: 66, rotation: 7, mobile: false },
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", x: 7, y: 76, rotation: -8, mobile: true },

  // ==========================================
  // ZONE 3: RIGHT (to the right of central card)
  // ==========================================
  { slug: "amazon-rds", label: "Amazon RDS", x: 80, y: 30, rotation: -7, mobile: false },
  { slug: "amazon-eks", label: "Amazon EKS", x: 93, y: 38, rotation: 9, mobile: true },
  { slug: "amazon-eventbridge", label: "Amazon EventBridge", x: 81, y: 52, rotation: -6, mobile: false },
  { slug: "aws-step-functions", label: "AWS Step Functions", x: 92, y: 66, rotation: 8, mobile: false },
  { slug: "amazon-sqs", label: "Amazon SQS", x: 80, y: 76, rotation: -7, mobile: true },

  // ==========================================
  // ZONE 4: BOTTOM (below the central CTA card)
  // ==========================================
  { slug: "amazon-ecs", label: "Amazon ECS", x: 14, y: 90, rotation: 6, mobile: false },
  { slug: "amazon-cognito", label: "Amazon Cognito", x: 32, y: 86, rotation: -8, mobile: true },
  { slug: "amazon-sns", label: "Amazon SNS", x: 50, y: 91, rotation: 5, mobile: false },
  { slug: "aws-amplify", label: "AWS Amplify", x: 68, y: 86, rotation: -7, mobile: true },
  { slug: "aws-codepipeline", label: "AWS CodePipeline", x: 86, y: 90, rotation: 6, mobile: true },
]

interface FloatingCloudIconsProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export function FloatingCloudIcons({ containerRef }: FloatingCloudIconsProps) {
  const localRef = React.useRef<HTMLDivElement>(null)
  const iconRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const currentProgressRef = React.useRef(0)
  const targetProgressRef = React.useRef(0)
  const animationFrameRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let prefersReducedMotion = motionQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
    }
    motionQuery.addEventListener("change", handleMotionChange)

    const updateScrollProgress = () => {
      const container = containerRef?.current || localRef.current?.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const containerCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2

      // Measure distance from viewport center
      const distFromCenter = containerCenter - viewportCenter
      // Influence window is roughly 50% of (viewport + container height)
      const influenceRange = (vh + rect.height) * 0.5

      if (prefersReducedMotion) {
        targetProgressRef.current = 0
        return
      }

      // Progress is 1 when centered; falls to 0 as it scrolls away
      const normalized = 1 - Math.min(Math.max(Math.abs(distFromCenter) / influenceRange, 0), 1)
      targetProgressRef.current = normalized
    }

    const animate = (time: number) => {
      // Damped spring-like interpolation (0.075 lerp factor) for silky smooth, non-sudden movement
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * 0.075

      const p = prefersReducedMotion ? 0 : currentProgressRef.current

      // Subtle max displacement towards center (32px max shift)
      const maxShift = 32

      iconRefs.current.forEach((el, index) => {
        if (!el) return
        const icon = CLOUD_SERVICE_ICONS[index]
        if (!icon) return

        // Direction vector towards container center (50, 50)
        const dx = 50 - icon.x
        const dy = 50 - icon.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const ux = dx / dist
        const uy = dy / dist

        // Subtle attraction shift
        const shiftX = ux * maxShift * p
        const shiftY = uy * maxShift * p

        // Subtle ambient floating motion (around 3px oscillation)
        const ambientX = prefersReducedMotion ? 0 : Math.cos(time * 0.0012 + index * 0.8) * 2
        const ambientY = prefersReducedMotion ? 0 : Math.sin(time * 0.0016 + index * 0.8) * 3

        const rot = icon.rotation + (1 - p) * (ux * 3)
        const scale = 0.95 + p * 0.08

        el.style.transform = `translate3d(calc(-50% + ${shiftX + ambientX}px), calc(-50% + ${shiftY + ambientY}px), 0) rotate(${rot}deg) scale(${scale})`
      })

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    window.addEventListener("resize", updateScrollProgress)
    updateScrollProgress()
    animationFrameRef.current = window.requestAnimationFrame(animate)

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [containerRef])

  return (
    <div
      ref={localRef}
      className="floating-cloud-icons pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {CLOUD_SERVICE_ICONS.map((icon, index) => (
        <div
          key={icon.slug}
          ref={(el) => {
            iconRefs.current[index] = el
          }}
          className={`floating-cloud-icon absolute flex items-center justify-center p-2 sm:p-2.5 rounded-xl bg-[#111622]/80 border border-white/10 shadow-xl shadow-black/40 backdrop-blur-md transition-shadow hover:border-white/30 group pointer-events-auto ${
            icon.mobile ? "flex" : "hidden sm:flex"
          }`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            willChange: "transform",
          }}
          title={icon.label}
        >
          <img
            src={`/icons/aws-services/${icon.slug}.svg`}
            alt={icon.label}
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain drop-shadow"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
          {/* Tooltip on hover */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded shadow-lg z-30">
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  )
}
