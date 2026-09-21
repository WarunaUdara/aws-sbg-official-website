import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-[2px] transition-colors transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.96]"
    
    const variants = {
      primary: "bg-[#FF9900] hover:bg-[#e68a00] text-[#0D0D0D] font-semibold focus-visible:outline-[#FF9900]",
      glow: "bg-[#FF9900] hover:bg-[#FFB84D] text-[#0D0D0D] font-bold focus-visible:outline-[#FF9900]",
      secondary: "bg-[#151515] hover:bg-[#1D1D1D] text-slate-100 border border-white/15 focus-visible:outline-white/60",
      outline: "border border-white/20 hover:border-[#FF9900] text-slate-200 hover:text-[#FF9900] bg-transparent focus-visible:outline-[#FF9900]",
      ghost: "text-slate-300 hover:text-white hover:bg-white/10 focus-visible:outline-white/60",
    }

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
