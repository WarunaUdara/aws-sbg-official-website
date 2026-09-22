import * as React from "react"

export interface CloudServiceIcon {
  slug: string
  label: string
  x: number // resting horizontal percentage [0..100]
  y: number // resting vertical percentage [0..100]
  rotation: number // resting rotation in degrees
  side?: boolean // whether this icon is positioned on the sides (hidden below xl)
}

/**
 * 10 of the most famous, industry-standard AWS service architecture icons,
 * cleanly distributed in the outer perimeter surrounding the CTA card with
 * safe margin to prevent any clipping.
 */
export const FAMOUS_AWS_ICONS: CloudServiceIcon[] = [
  // ==============================================================
  // TOP ROW (safely above the card with generous vertical margin)
  // ==============================================================
  { slug: "amazon-s3", label: "Amazon S3", x: 18, y: 14, rotation: -6 },
  { slug: "aws-lambda", label: "AWS Lambda", x: 39, y: 11, rotation: 6 },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", x: 61, y: 11, rotation: -5 },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", x: 82, y: 14, rotation: 5 },

  // ==============================================================
  // SIDES (vertically centered beside the card, visible on xl screens)
  // ==============================================================
  { slug: "amazon-ec2", label: "Amazon EC2", x: 5.5, y: 50, rotation: -7, side: true },
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", x: 94.5, y: 50, rotation: 7, side: true },

  // ==============================================================
  // BOTTOM ROW (safely below the card with generous bottom clearance)
  // ==============================================================
  { slug: "amazon-rds", label: "Amazon RDS", x: 18, y: 86, rotation: 6 },
  { slug: "amazon-ecs", label: "Amazon ECS", x: 39, y: 89, rotation: -5 },
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", x: 61, y: 89, rotation: 5 },
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", x: 82, y: 86, rotation: -6 },
]

interface FloatingCloudIconsProps {
  containerRef?: React.RefObject<HTMLElement | null>
}

export function FloatingCloudIcons({ containerRef }: FloatingCloudIconsProps) {
  const localRef = React.useRef<HTMLDivElement>(null)
  const iconRefs = React.useRef<(HTMLImageElement | null)[]>([])
  const currentShiftRef = React.useRef(0)
  const targetShiftRef = React.useRef(0)
  const lastScrollYRef = React.useRef(0)
  const isAnimatingRef = React.useRef(false)
  const rafIdRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let prefersReducedMotion = motionQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
      if (prefersReducedMotion) {
        currentShiftRef.current = 0
        targetShiftRef.current = 0
        applyShift(0)
      }
    }
    motionQuery.addEventListener("change", handleMotionChange)

    const applyShift = (shiftAmount: number) => {
      // Scale shift proportionally on mobile so icons never collide or clip
      const isMobile = window.innerWidth < 640
      const effectiveShift = isMobile ? shiftAmount * 0.45 : shiftAmount

      iconRefs.current.forEach((el, index) => {
        if (!el) return
        const icon = FAMOUS_AWS_ICONS[index]
        if (!icon) return

        // Direction vector from icon towards CTA card center (50, 50)
        const dx = 50 - icon.x
        const dy = 50 - icon.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const ux = dx / dist
        const uy = dy / dist

        // Positive shift = attraction inward toward center (when scrolling down)
        // Negative shift = repulsion outward away from center (when scrolling up)
        const shiftX = ux * effectiveShift
        const shiftY = uy * effectiveShift

        // Subtle rotational shift responding to displacement
        const dynamicRotation = icon.rotation + (shiftAmount / 16) * (ux * 2.5)

        el.style.transform = `translate3d(calc(-50% + ${shiftX.toFixed(2)}px), calc(-50% + ${shiftY.toFixed(2)}px), 0) rotate(${dynamicRotation.toFixed(2)}deg)`
      })
    }

    const tick = () => {
      if (prefersReducedMotion) {
        applyShift(0)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      // Smooth damping easing towards target
      const diff = targetShiftRef.current - currentShiftRef.current

      // As user stops scrolling, decay dynamic target shift back to 0 (resting position)
      targetShiftRef.current *= 0.88

      // When settled at resting position, snap to 0 and STOP loop completely (0% idle CPU)
      if (
        Math.abs(diff) < 0.05 &&
        Math.abs(targetShiftRef.current) < 0.05 &&
        Math.abs(currentShiftRef.current) < 0.05
      ) {
        currentShiftRef.current = 0
        targetShiftRef.current = 0
        applyShift(0)
        isAnimatingRef.current = false
        rafIdRef.current = null
        return
      }

      currentShiftRef.current += diff * 0.12
      applyShift(currentShiftRef.current)

      rafIdRef.current = window.requestAnimationFrame(tick)
    }

    const handleScroll = () => {
      if (prefersReducedMotion) return

      const scrollY = Math.max(0, window.scrollY)
      const scrollDelta = scrollY - lastScrollYRef.current
      lastScrollYRef.current = scrollY

      // Ignore zero-delta or minute jitter
      if (Math.abs(scrollDelta) < 0.1) return

      const container = containerRef?.current || localRef.current?.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight

      // Boundary check: if container is outside view, reset and do not animate
      if (rect.bottom < -80 || rect.top > vh + 80) {
        targetShiftRef.current = 0
        return
      }

      // Container center relative to viewport center
      const containerCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2
      const distFromCenter = containerCenter - viewportCenter
      const influenceRange = (vh + rect.height) * 0.6

      // Proximity factor [0.3..1]: active attraction/repulsion when CTA is in or entering view
      const proximity = Math.max(0.3, 1 - Math.abs(distFromCenter) / influenceRange)

      // Dynamic impulse:
      // scrollDelta > 0 (scrolling down) -> positive impulse (attraction inward toward card)
      // scrollDelta < 0 (scrolling up)   -> negative impulse (repulsion outward away from card)
      const impulse = Math.max(-12, Math.min(12, scrollDelta * 0.35)) * proximity

      // Accumulate into targetShift with smooth bounds:
      // Inward attraction clamp: +16px
      // Outward repulsion clamp: -14px
      const nextTarget = targetShiftRef.current + impulse
      targetShiftRef.current = Math.max(-14, Math.min(16, nextTarget))

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        rafIdRef.current = window.requestAnimationFrame(tick)
      }
    }

    const handleResize = () => {
      lastScrollYRef.current = Math.max(0, window.scrollY)
      applyShift(currentShiftRef.current)
    }

    lastScrollYRef.current = Math.max(0, window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    // Initial render resting position
    applyShift(0)

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
      window.removeEventListener("scroll", handleScroll)
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
