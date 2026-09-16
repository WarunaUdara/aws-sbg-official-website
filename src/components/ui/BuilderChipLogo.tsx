import * as React from "react"

export interface BuilderChipLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
}

export function BuilderChipLogo({
  size = 28,
  color = "currentColor",
  className = "",
  ...props
}: BuilderChipLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AWS SBG USJ Builder Chip Logo"
      {...props}
    >
      {/* Central Square Ring with Hollow Core */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4H24V24H4V4ZM8 8H20V20H8V8Z"
        fill={color}
      />
      {/* Top 3 Pins */}
      <rect x="4" y="0" width="4" height="4" fill={color} />
      <rect x="12" y="0" width="4" height="4" fill={color} />
      <rect x="20" y="0" width="4" height="4" fill={color} />

      {/* Bottom 3 Pins */}
      <rect x="4" y="24" width="4" height="4" fill={color} />
      <rect x="12" y="24" width="4" height="4" fill={color} />
      <rect x="20" y="24" width="4" height="4" fill={color} />

      {/* Left 3 Pins */}
      <rect x="0" y="4" width="4" height="4" fill={color} />
      <rect x="0" y="12" width="4" height="4" fill={color} />
      <rect x="0" y="20" width="4" height="4" fill={color} />

      {/* Right 3 Pins */}
      <rect x="24" y="4" width="4" height="4" fill={color} />
      <rect x="24" y="12" width="4" height="4" fill={color} />
      <rect x="24" y="20" width="4" height="4" fill={color} />
    </svg>
  )
}
