import * as React from "react"

export interface CloudServiceIcon {
  slug: string
  label: string
  x: number // starting horizontal percentage [0..100] (near borders)
  y: number // starting vertical percentage [0..100] (near borders)
  side?: boolean // whether this icon is positioned on the sides (hidden below xl)
}

/**
 * 10 famous, industry-standard AWS service architecture icons.
 * Starting positions are distributed near the outer borders of the section.
 * The midpoint (50%, 50%) acts as the centre of gravity:
 * - Scrolling DOWN: icons attract / move IN towards the CTA section.
 * - Scrolling UP: icons reverse / move OUT back towards the borders.
 * - Scroll stopped: icons freeze in place (zero idle motion, 0% CPU).
 * - No icon rotation (clean, level architecture icons).
 */
export const FAMOUS_AWS_ICONS: CloudServiceIcon[] = [
  // ==============================================================
  // TOP ROW (starting near top border, moving down/in towards card)
  // ==============================================================
  { slug: "amazon-s3", label: "Amazon S3", x: 18, y: 10 },
  { slug: "aws-lambda", label: "AWS Lambda", x: 39, y: 8 },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", x: 61, y: 8 },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", x: 82, y: 10 },

  // ==============================================================
  // SIDES (starting near left/right borders, moving in towards center)
  // Rendered on xl screens where ample horizontal room exists
  // ==============================================================
  { slug: "amazon-ec2", label: "Amazon EC2", x: 4, y: 50, side: true },
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", x: 96, y: 50, side: true },

  // ==============================================================
  // BOTTOM ROW (starting near bottom border, moving up/in towards card)
  // ==============================================================
  { slug: "amazon-rds", label: "Amazon RDS", x: 18, y: 90 },
  { slug: "amazon-ecs", label: "Amazon ECS", x: 39, y: 92 },
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", x: 61, y: 92 },
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", x: 82, y: 90 },
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
        applyProgress(0)
      }
    }
    motionQuery.addEventListener("change", handleMotionChange)

    const applyProgress = (p: number) => {
      // Subtle shift: 30px inward on desktop, 16px on mobile
      const isMobile = window.innerWidth < 640
      const maxShift = isMobile ? 16 : 30

      iconRefs.current.forEach((el, index) => {
        if (!el) return
        const icon = FAMOUS_AWS_ICONS[index]
        if (!icon) return

        // Direction vector from icon starting position towards midpoint centre of gravity (50, 50)
        const dx = 50 - icon.x
        const dy = 50 - icon.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const ux = dx / dist
        const uy = dy / dist

        // Move in towards midpoint as progress increases (scroll down)
        // Move out towards borders as progress decreases (scroll up)
        const shiftX = ux * maxShift * p
        const shiftY = uy * maxShift * p

        // NO ROTATION: Icons remain strictly level and upright
        el.style.transform = `translate3d(calc(-50% + ${shiftX.toFixed(2)}px), calc(-50% + ${shiftY.toFixed(2)}px), 0)`
      })
    }

    const tick = () => {
      if (prefersReducedMotion) {
        applyProgress(0)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      const diff = targetProgressRef.current - currentProgressRef.current

      // When settled at target scroll position, snap and terminate loop (0% idle CPU)
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetProgressRef.current
        applyProgress(currentProgressRef.current)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      // Smooth damping interpolation (lerp)
      currentProgressRef.current += diff * 0.1
      applyProgress(currentProgressRef.current)

      rafIdRef.current = window.requestAnimationFrame(tick)
    }

    const updateScrollProgress = () => {
      if (prefersReducedMotion) {
        targetProgressRef.current = 0
        currentProgressRef.current = 0
        applyProgress(0)
        return
      }

      const container = containerRef?.current || localRef.current?.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight

      // If container is far below the viewport, icons rest at borders (p = 0)
      if (rect.top >= vh + 100) {
        targetProgressRef.current = 0
      } else {
        // As user scrolls down, containerCenter decreases towards and past the viewport center.
        // startCenter: section enters lower viewport -> p = 0
        // endCenter: section reaches viewport center -> p = 1 (attracted into CTA card)
        // Scrolling further down maintains p = 1 (NO repulsion while scrolling down)
        const containerCenter = rect.top + rect.height / 2
        const startCenter = vh + rect.height * 0.15
        const endCenter = vh * 0.5

        const raw = (startCenter - containerCenter) / (startCenter - endCenter)
        targetProgressRef.current = Math.max(0, Math.min(1, raw))
      }

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        rafIdRef.current = window.requestAnimationFrame(tick)
      }
    }

    const handleResize = () => {
      updateScrollProgress()
    }

    window.addEventListener("scroll", updateScrollProgress, { passive: true })
    window.addEventListener("resize", handleResize)

    // Initial position based on current scroll
    updateScrollProgress()

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
      window.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", handleResize)
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [containerRef])

  return (
    <div
      ref={localRef}
      className="floating-cloud-icons pointer-events-none absolute inset-0 z-0 select-none"
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
          className={`floating-cloud-icon absolute w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 object-contain rounded-none select-none drop-shadow-xl ${
            icon.side ? "hidden xl:block" : "block"
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
