import * as React from "react"

export interface AwsSmileLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string
  color?: string
}

export function AwsSmileLogo({
  size = 48,
  className = "",
  alt = "AWS Logo",
  style,
  color: _color,
  ...props
}: AwsSmileLogoProps) {
  const pixelSize = typeof size === "number" ? size : undefined

  return (
    <img
      src="/icons/aws-light.webp"
      width={pixelSize}
      height={pixelSize}
      alt={alt}
      className={`object-contain inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: "auto",
        maxHeight: size,
        ...style,
      }}
      {...props}
    />
  )
}
