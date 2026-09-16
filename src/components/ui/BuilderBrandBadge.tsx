import * as React from "react"
import { cn } from "@/lib/utils"

export interface BuilderBrandBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "orange" | "minimal"
  size?: "sm" | "md" | "lg"
}

export function BuilderBrandBadge({
  variant = "dark",
  size = "md",
  className,
  ...props
}: BuilderBrandBadgeProps) {
  const isOrange = variant === "orange"

  const boxSizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-18 h-18",
  }

  const textSizes = {
    sm: "text-[10px] leading-tight",
    md: "text-xs leading-snug",
    lg: "text-sm leading-normal",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 select-none",
        className
      )}
      {...props}
    >
      {/* Anchored Square Box with Builder Chip Logo */}
      <div
        className={cn(
          "flex items-center justify-center shrink-0 border transition-transform",
          boxSizes[size],
          isOrange
            ? "bg-[#FF9900] border-[#FF9900] text-[#0A0E17]"
            : "bg-[#161F2E] border-[#FF9900]/30 text-[#FF9900]"
        )}
      >
        <img
          src="/icons/sbg-icon-only.png"
          alt="AWS SBG Logo"
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Official Monospace Signature */}
      <div className={cn("font-mono font-medium", textSizes[size])}>
        <div className={isOrange ? "text-[#0A0E17] font-semibold" : "text-white font-semibold"}>
          AWS Student Builder Group
        </div>
        <div className={isOrange ? "text-[#0A0E17]/80" : "text-slate-400"}>
          at University of Sri Jayewardenepura
        </div>
      </div>
    </div>
  )
}
