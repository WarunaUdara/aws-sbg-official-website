import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
    
    const variants = {
      primary: "bg-[#FF9900] hover:bg-[#e68a00] text-slate-950 font-semibold focus:ring-[#FF9900] shadow-sm hover:shadow-md active:scale-[0.98]",
      glow: "bg-gradient-to-r from-[#FF9900] to-[#FFA41C] text-slate-950 font-bold shadow-[0_0_20px_rgba(255,153,0,0.35)] hover:shadow-[0_0_25px_rgba(255,153,0,0.6)] hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-500 active:scale-[0.98]",
      outline: "border border-slate-700 hover:border-[#FF9900] text-slate-200 hover:text-[#FF9900] bg-transparent focus:ring-[#FF9900] active:scale-[0.98]",
      ghost: "text-slate-300 hover:text-white hover:bg-slate-800/60 focus:ring-slate-700",
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
