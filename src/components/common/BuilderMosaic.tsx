import * as React from "react"
import { cn } from "@/lib/utils"

export interface BuilderMosaicProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "sparse" | "compact" | "banner"
}

/**
 * Recreates the stepped architectural square block mosaic
 * seen in the official AWS SBG USJ brand graphics.
 */
export function BuilderMosaic({
  density = "compact",
  className,
  ...props
}: BuilderMosaicProps) {
  if (density === "banner") {
    return (
      <div
        className={cn("grid grid-cols-4 grid-rows-3 gap-[1px] bg-white/10 p-[1px]", className)}
        {...props}
      >
        <div className="w-12 h-12 bg-[#FF9900]" />
        <div className="w-12 h-12 bg-[#161F2E]" />
        <div className="w-12 h-12 bg-[#FF9900]" />
        <div className="w-12 h-12 bg-[#161F2E]" />

        <div className="w-12 h-12 bg-[#161F2E]" />
        <div className="w-12 h-12 bg-[#FF9900]" />
        <div className="w-12 h-12 bg-[#161F2E]" />
        <div className="w-12 h-12 bg-[#FF9900]" />

        <div className="w-12 h-12 bg-[#FF9900]" />
        <div className="w-12 h-12 bg-[#161F2E]" />
        <div className="w-12 h-12 bg-[#FF9900]" />
        <div className="w-12 h-12 bg-[#FF9900]" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative grid grid-cols-5 grid-rows-4 gap-[1px] bg-white/10 p-[1px] w-fit",
        className
      )}
      {...props}
    >
      {/* Row 1 */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />

      {/* Row 2 */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />

      {/* Row 3 */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />

      {/* Row 4 */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#161F2E]" />
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF9900]" />
    </div>
  )
}
