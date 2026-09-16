import * as React from "react"

export interface AwsSmileLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
}

export function AwsSmileLogo({
  size = 48,
  color = "currentColor",
  className = "",
  ...props
}: AwsSmileLogoProps) {
  return (
    <svg
      width={size}
      height={typeof size === "number" ? Math.round(size * 0.6) : "auto"}
      viewBox="0 0 100 60"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AWS Logo"
      {...props}
    >
      {/* AWS Text glyphs */}
      <path d="M22.5 12.2h4.5l8.7 26.6h-4.8l-2.1-7.1H18.2l-2.1 7.1h-4.6l8.9-26.6h2.1zm4.9 15.6l-3.9-13.4-4 13.4h7.9z" />
      <path d="M38.5 12.2h4.6l4.6 19.3 5.4-19.3h4.6l5.4 19.3 4.6-19.3h4.6l-7.2 26.6h-4.7L55 19.8l-5.3 19h-4.7l-6.5-26.6z" />
      <path d="M85.4 17.5c-2.8-1.5-6.3-2-9.4-1.4-3.1.6-5.8 2.3-7.5 4.8l3.7 2.4c1.2-1.7 3.1-2.9 5.2-3.3 2.1-.4 4.3 0 6.1 1 1.7 1 2.7 2.7 2.6 4.6v.7c-3-.4-6-.3-9 .4-2.8.6-5.4 2.2-6.9 4.6-1.5 2.5-1.9 5.6-1.1 8.4.8 2.8 2.8 5 5.5 6.1 2.7 1.1 5.8 1.1 8.6.1 2.7-1 4.9-3 6.1-5.6v5.2h4.2v-18.7c.1-4-1.9-7.8-5.3-9.9zm-4.4 20.3c-.9 1.7-2.3 3.1-4.1 3.9-1.8.8-3.9.8-5.7.1-1.7-.7-3-2.1-3.6-3.8-.6-1.8-.3-3.8.7-5.3 1-1.5 2.6-2.5 4.5-2.8 2-.3 4-.3 6 .1v7.8z" />
      {/* AWS Smile Curved Arrow */}
      <path d="M87.5 47.7c-13.6 8.7-31.5 11.4-47.5 7.1-8-2.1-15.6-6-22.1-11.2-.8-.6-1.8.3-1.3 1.1 6.8 9.3 17.8 15.6 29.4 17.4 14.8 2.2 30.1-.8 42.4-8.8 1.3-.9.4-2.9-1.2-2.5-.1 0-.1 0-.1 0z" />
      <path d="M91.3 43.1c-1.2-.5-3.3-.3-5.2-.2-1.3.1-1.6 1.4-.4 1.8 3.5 1.1 7.2 2 10.9 2.5.9.1 1.6-.7 1.3-1.5-1.5-3.6-3.2-7-5.4-10.2-.8-1.1-2.1-.5-1.9.7.2 2.3.4 4.8.7 6.9z" />
    </svg>
  )
}
