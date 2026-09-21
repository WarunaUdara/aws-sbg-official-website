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
  // ==============================================================
  // TOP MARGIN (above text and coordinate grid chip)
  // ==============================================================
  { slug: "amazon-s3", label: "Amazon S3", x: 8, y: 5, rotation: 6, mobile: true },
  { slug: "aws-lambda", label: "AWS Lambda", x: 25, y: 3, rotation: -7, mobile: true },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", x: 44, y: 5, rotation: 4, mobile: false },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", x: 62, y: 3, rotation: -6, mobile: true },
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", x: 82, y: 4, rotation: 7, mobile: true },
  { slug: "amazon-ec2", label: "Amazon EC2", x: 94, y: 7, rotation: -8, mobile: true },

  // ==============================================================
  // LEFT MARGIN (to the far left of text content)
  // ==============================================================
  { slug: "amazon-vpc", label: "Amazon VPC", x: 2, y: 38, rotation: 8, mobile: false },
  { slug: "amazon-aurora", label: "Amazon Aurora", x: 3, y: 68, rotation: -6, mobile: false },

  // ==============================================================
  // CENTER CHANNEL (gap between left text and right grid chip)
  // ==============================================================
  { slug: "amazon-rds", label: "Amazon RDS", x: 53, y: 22, rotation: -5, mobile: false },
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", x: 52, y: 52, rotation: 6, mobile: false },
  { slug: "aws-step-functions", label: "AWS Step Functions", x: 54, y: 80, rotation: -7, mobile: false },

  // ==============================================================
  // RIGHT MARGIN (to the far right of coordinate grid chip)
  // ==============================================================
  { slug: "amazon-eks", label: "Amazon EKS", x: 97, y: 38, rotation: 8, mobile: false },
  { slug: "amazon-eventbridge", label: "Amazon EventBridge", x: 95, y: 68, rotation: -6, mobile: true },

  // ==============================================================
  // BOTTOM MARGIN (below buttons and coordinate grid chip)
  // ==============================================================
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", x: 6, y: 94, rotation: -6, mobile: true },
  { slug: "amazon-cognito", label: "Amazon Cognito", x: 22, y: 95, rotation: 5, mobile: false },
  { slug: "amazon-sns", label: "Amazon SNS", x: 38, y: 94, rotation: -7, mobile: false },
  { slug: "amazon-ecs", label: "Amazon ECS", x: 44, y: 78, rotation: 6, mobile: false },
  { slug: "amazon-sqs", label: "Amazon SQS", x: 68, y: 95, rotation: 7, mobile: true },
  { slug: "aws-amplify", label: "AWS Amplify", x: 82, y: 93, rotation: -5, mobile: true },
  { slug: "aws-codepipeline", label: "AWS CodePipeline", x: 95, y: 94, rotation: 6, mobile: true },
]

interface FloatingCloudIconsProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export function FloatingCloudIcons({ containerRef }: FloatingCloudIconsProps) {
  const localRef = React.useRef<HTMLDivElement>(null)
  const iconRefs = React.useRef<(HTMLImageElement | null)[]>([])
  const currentProgressRef = React.useRef(0)
  const targetProgressRef = React.useRef(0)
  const isAnimatingRef = React.useRef(false)
  const rafIdRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let prefersReducedMotion = motionQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
      if (prefersReducedMotion) {
        currentProgressRef.current = 0
        targetProgressRef.current = 0
        applyTransforms(0)
      }
    }
    motionQuery.addEventListener("change", handleMotionChange)

    const applyTransforms = (p: number) => {
      // Maximum displacement towards container center: subtle 26px
      const maxShift = 26

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

        // Subtle attraction shift along the vector
        const shiftX = ux * maxShift * p
        const shiftY = uy * maxShift * p
        const rot = icon.rotation + (1 - p) * (ux * 2.5)

        el.style.transform = `translate3d(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px), 0) rotate(${rot}deg)`
      })
    }

    const tick = () => {
      if (prefersReducedMotion) {
        applyTransforms(0)
        isAnimatingRef.current = false
        return
      }

      const diff = targetProgressRef.current - currentProgressRef.current

      // When the difference is negligible, snap to target and STOP animation loop completely
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetProgressRef.current
        applyTransforms(currentProgressRef.current)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return // Loop stops when scroll stops! Zero CPU when idle.
      }

      // Smooth damping easing
      currentProgressRef.current += diff * 0.12
      applyTransforms(currentProgressRef.current)

      rafIdRef.current = window.requestAnimationFrame(tick)
    }

    const updateScrollProgress = () => {
      const container = containerRef?.current || localRef.current?.parentElement
      if (!container) return

      if (prefersReducedMotion) {
        targetProgressRef.current = 0
        return
      }

      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const containerCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2

      // Measure distance from viewport center
      const distFromCenter = containerCenter - viewportCenter
      // Influence range around viewport center
      const influenceRange = (vh + rect.height) * 0.55

      // Progress: 1 when centered; falls to 0 as user scrolls away
      const normalized = 1 - Math.min(Math.max(Math.abs(distFromCenter) / influenceRange, 0), 1)
      targetProgressRef.current = normalized

      // Only run requestAnimationFrame while active, then stop when settled
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        rafIdRef.current = window.requestAnimationFrame(tick)
      }
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    window.addEventListener("resize", updateScrollProgress)

    // Initial position setup
    updateScrollProgress()

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
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
        <img
          key={icon.slug}
          ref={(el) => {
            iconRefs.current[index] = el
          }}
          src={`/icons/aws-services/${icon.slug}.svg`}
          alt={icon.label}
          className={`floating-cloud-icon absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-none select-none drop-shadow-md ${
            icon.mobile ? "block" : "hidden sm:block"
          }`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            willChange: "transform",
          }}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  )
}
