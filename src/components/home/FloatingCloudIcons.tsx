import * as React from "react"

interface FloatingCloudIcon {
  slug: string
  label: string
  originX: number
  originY: number
  originRotation: number
  destinationX: number
  destinationY: number
  destinationRotation: number
}

interface FloatingCloudIconsProps {
  targetId: string
}

interface LayoutState {
  ready: boolean
  progress: number
  viewportWidth: number
  viewportHeight: number
  targetCenterX: number
  targetCenterY: number
}

const ICONS: FloatingCloudIcon[] = [
  { slug: "amazon-ec2", label: "Amazon EC2", originX: 0.08, originY: 0.25, originRotation: -8, destinationX: -1.08, destinationY: -0.62, destinationRotation: -12 },
  { slug: "amazon-s3", label: "Amazon S3", originX: 0.19, originY: 0.11, originRotation: 7, destinationX: -0.82, destinationY: -0.92, destinationRotation: 8 },
  { slug: "amazon-dynamodb", label: "Amazon DynamoDB", originX: 0.32, originY: 0.28, originRotation: -5, destinationX: -0.45, destinationY: -1.16, destinationRotation: -6 },
  { slug: "amazon-rds", label: "Amazon RDS", originX: 0.44, originY: 0.14, originRotation: 9, destinationX: -0.08, destinationY: -1.32, destinationRotation: 10 },
  { slug: "amazon-aurora", label: "Amazon Aurora", originX: 0.58, originY: 0.25, originRotation: -6, destinationX: 0.3, destinationY: -1.22, destinationRotation: -8 },
  { slug: "amazon-bedrock", label: "Amazon Bedrock", originX: 0.72, originY: 0.12, originRotation: 6, destinationX: 0.67, destinationY: -0.98, destinationRotation: 7 },
  { slug: "amazon-cloudfront", label: "Amazon CloudFront", originX: 0.9, originY: 0.26, originRotation: -9, destinationX: 1.04, destinationY: -0.6, destinationRotation: -10 },
  { slug: "amazon-cloudwatch", label: "Amazon CloudWatch", originX: 0.96, originY: 0.48, originRotation: 8, destinationX: 1.2, destinationY: -0.1, destinationRotation: 8 },
  { slug: "amazon-vpc", label: "Amazon VPC", originX: 0.06, originY: 0.54, originRotation: 5, destinationX: -1.2, destinationY: 0.08, destinationRotation: 5 },
  { slug: "amazon-ecs", label: "Amazon ECS", originX: 0.17, originY: 0.71, originRotation: -7, destinationX: -1.06, destinationY: 0.66, destinationRotation: -8 },
  { slug: "amazon-eks", label: "Amazon EKS", originX: 0.3, originY: 0.84, originRotation: 6, destinationX: -0.78, destinationY: 1.04, destinationRotation: 6 },
  { slug: "aws-lambda", label: "AWS Lambda", originX: 0.46, originY: 0.74, originRotation: -10, destinationX: -0.43, destinationY: 1.25, destinationRotation: -12 },
  { slug: "amazon-api-gateway", label: "Amazon API Gateway", originX: 0.62, originY: 0.88, originRotation: 8, destinationX: 0.02, destinationY: 1.36, destinationRotation: 9 },
  { slug: "amazon-cognito", label: "Amazon Cognito", originX: 0.78, originY: 0.74, originRotation: -7, destinationX: 0.43, destinationY: 1.26, destinationRotation: -8 },
  { slug: "amazon-eventbridge", label: "Amazon EventBridge", originX: 0.93, originY: 0.84, originRotation: 9, destinationX: 0.78, destinationY: 1.02, destinationRotation: 10 },
  { slug: "amazon-sqs", label: "Amazon SQS", originX: 0.04, originY: 0.86, originRotation: -6, destinationX: 1.12, destinationY: 0.66, destinationRotation: -7 },
  { slug: "amazon-sns", label: "Amazon SNS", originX: 0.12, originY: 0.38, originRotation: 8, destinationX: 1.24, destinationY: 0.08, destinationRotation: 9 },
  { slug: "aws-step-functions", label: "AWS Step Functions", originX: 0.86, originY: 0.61, originRotation: -8, destinationX: -1.17, destinationY: 0.28, destinationRotation: -9 },
  { slug: "aws-codepipeline", label: "AWS CodePipeline", originX: 0.39, originY: 0.08, originRotation: 6, destinationX: 0.98, destinationY: 0.84, destinationRotation: 7 },
  { slug: "aws-amplify", label: "AWS Amplify", originX: 0.69, originY: 0.8, originRotation: -6, destinationX: -0.98, destinationY: 0.88, destinationRotation: -7 },
]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress

export function FloatingCloudIcons({ targetId }: FloatingCloudIconsProps) {
  const [layout, setLayout] = React.useState<LayoutState>({
    ready: false,
    progress: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    targetCenterX: 0,
    targetCenterY: 0,
  })

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let prefersReducedMotion = motionQuery.matches
    let frame = 0

    const measure = () => {
      frame = 0
      const target = document.getElementById(targetId)
      if (!target) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const targetRect = target.getBoundingClientRect()
      const targetCenterY = targetRect.top + targetRect.height / 2
      const focusDistance = Math.abs(targetCenterY - viewportHeight * 0.5)
      const progress = prefersReducedMotion
        ? 0
        : clamp(1 - (focusDistance - viewportHeight * 0.12) / (viewportHeight * 0.68), 0, 1)

      setLayout({
        ready: true,
        progress,
        viewportWidth,
        viewportHeight,
        targetCenterX: targetRect.left + targetRect.width / 2,
        targetCenterY: targetCenterY + window.scrollY,
      })
    }

    const scheduleMeasure = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure)
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches
      scheduleMeasure()
    }

    motionQuery.addEventListener("change", handleMotionPreference)
    window.addEventListener("scroll", scheduleMeasure, { passive: true })
    window.addEventListener("resize", scheduleMeasure)
    scheduleMeasure()

    return () => {
      motionQuery.removeEventListener("change", handleMotionPreference)
      window.removeEventListener("scroll", scheduleMeasure)
      window.removeEventListener("resize", scheduleMeasure)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [targetId])

  if (!layout.ready) return null

  const radiusX = Math.min(layout.viewportWidth * 0.42, 520)
  const radiusY = Math.min(layout.viewportHeight * 0.28, 240)

  return (
    <div className="floating-cloud-icons absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {ICONS.map((icon) => {
        const originX = icon.originX * layout.viewportWidth
        const originY = icon.originY * layout.viewportHeight
        const destinationX = layout.targetCenterX + icon.destinationX * radiusX
        const destinationY = layout.targetCenterY + icon.destinationY * radiusY
        const x = lerp(originX, destinationX, layout.progress)
        const y = lerp(originY, destinationY, layout.progress)
        const rotation = lerp(icon.originRotation, icon.destinationRotation, layout.progress)
        const scale = lerp(0.84, 1, layout.progress)

        return (
          <img
            key={icon.slug}
            src={`/icons/aws-services/${icon.slug}.svg`}
            alt=""
            className="floating-cloud-icon absolute h-12 w-12 select-none object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            data-icon-name={icon.label}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
              willChange: "transform",
            }}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        )
      })}
    </div>
  )
}
