import * as React from "react"

export interface CloudServiceIcon {
  slug: string
  label: string
  x: number // resting horizontal percentage [0..100]
  y: number // resting vertical percentage [0..100]
  rotation: number // resting rotation in degrees
  mobile: boolean // whether shown on small mobile displays
}

/**
 * 12 most famous, industry-standard AWS service icons positioned
 * in the outer perimeter surrounding the central CTA card.
 */
export const FAMOUS_AWS_ICONS: CloudServiceIcon[] = [
  // ==============================================================
  // TOP ZONE (outside card, across top margin)
  // ==============================================================
  { slug: "amazon-s3", label: "Amazon S3", x: 18, y: 7, rotation: -6, mobile: true },
  { slug: "aws-lambda", label: "AWS Lambda", x: 38, y: 4, rotation: 7, mobile: true },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", x: 62, y: 4, rotation: -5, mobile: true },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", x: 82, y: 7, rotation: 6, mobile: true },

  // ==============================================================
  // LEFT ZONE (outside card, along left margin)
  // ==============================================================
  { slug: "amazon-ec2", label: "Amazon EC2", x: 4, y: 38, rotation: -8, mobile: true },
  { slug: "amazon-rds", label: "Amazon RDS", x: 5, y: 66, rotation: 7, mobile: false },

  // ==============================================================
  // RIGHT ZONE (outside card, along right margin)
  // ==============================================================
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", x: 95, y: 38, rotation: 8, mobile: true },
  { slug: "amazon-ecs", label: "Amazon ECS", x: 94, y: 66, rotation: -7, mobile: false },

  // ==============================================================
  // BOTTOM ZONE (outside card, across bottom margin)
  // ==============================================================
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", x: 18, y: 93, rotation: 6, mobile: false },
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", x: 38, y: 95, rotation: -7, mobile: true },
  { slug: "amazon-cognito", label: "Amazon Cognito", x: 62, y: 95, rotation: 5, mobile: false },
  { slug: "aws-amplify", label: "AWS Amplify", x: 82, y: 93, rotation: -6, mobile: true },
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
      // Subtle 24px inward displacement towards CTA card center
      const maxShift = 24

      iconRefs.current.forEach((el, index) => {
        if (!el) return
        const icon = FAMOUS_AWS_ICONS[index]
        if (!icon) return

        // Direction vector towards CTA center (50, 50)
        const dx = 50 - icon.x
        const dy = 50 - icon.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const ux = dx / dist
        const uy = dy / dist

        // Attraction shift along vector towards center
        const shiftX = ux * maxShift * p
        const shiftY = uy * maxShift * p
        const rot = icon.rotation + (1 - p) * (ux * 2)

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

      // When difference is tiny, settle and STOP loop immediately (0% idle CPU)
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetProgressRef.current
        applyTransforms(currentProgressRef.current)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      // Smooth damping interpolation
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
      const influenceRange = (vh + rect.height) * 0.55

      // Progress: 1 when CTA is centered; drops to 0 as user scrolls away
      const normalized = 1 - Math.min(Math.max(Math.abs(distFromCenter) / influenceRange, 0), 1)
      targetProgressRef.current = normalized

      // Only animate while active
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        rafIdRef.current = window.requestAnimationFrame(tick)
      }
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    window.addEventListener("resize", updateScrollProgress)

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
      {FAMOUS_AWS_ICONS.map((icon, index) => (
        <img
          key={icon.slug}
          ref={(el) => {
            iconRefs.current[index] = el
          }}
          src={`/icons/aws-services/${icon.slug}.svg`}
          alt={icon.label}
          className={`floating-cloud-icon absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-none select-none drop-shadow-xl ${
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
