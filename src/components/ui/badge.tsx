import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "aws" | "success" | "outline" | "secondary"
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center rounded-none px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors"
  
  const variants = {
    default: "bg-slate-800 text-slate-200 border border-slate-700",
    aws: "bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    outline: "border border-slate-600 text-slate-300",
    secondary: "bg-slate-700/50 text-slate-300 border border-slate-600/50",
  }

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}
