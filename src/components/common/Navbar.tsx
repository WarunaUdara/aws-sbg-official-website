import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Menu, X, ChevronDown, MessageSquare } from "lucide-react"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { Container } from "./Container"
import { BuilderChipLogo } from "@/components/ui/BuilderChipLogo"
import { GithubIcon } from "@/components/ui/icons"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center bg-[#161F2E] border border-white/20 text-[#FF9900] group-hover:border-[#FF9900] transition-colors">
              <BuilderChipLogo size={18} color="#FF9900" />
            </div>
            <div className="flex items-baseline gap-1.5 font-display">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-[#FF9900] transition-colors">
                aws-sbg
              </span>
              <span className="text-[11px] font-mono text-[#FF9900] font-semibold tracking-wider">
                .usj
              </span>
            </div>
          </Link>

          {/* Center / Right Navigation Links (Unkey layout) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-sans">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? "text-[#FF9900] font-semibold" : "text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Units: Discord, GitHub Stars, Login, Sign Up */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Discord Pill */}
            <a
              href={SITE_CONFIG.links.discord}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 border border-white/15 hover:border-white/40 text-xs font-mono text-slate-300 hover:text-white transition-all bg-[#0A0E17]"
            >
              Discord
            </a>

            {/* GitHub Stars Pill */}
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-white/40 text-xs font-mono text-slate-300 hover:text-white transition-all bg-[#0A0E17]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.githubStars || "★ Star"}</span>
            </a>

            {/* Login / Portal Link */}
            <Link
              to="/contact"
              className="px-3.5 py-1.5 border border-white/20 hover:border-white text-xs font-sans font-medium text-white transition-all bg-transparent"
            >
              Login
            </Link>

            {/* Sign Up / Join CTA (Solid White Button) */}
            <Link
              to="/contact"
              className="px-4 py-1.5 bg-white hover:bg-slate-200 text-[#0A0E17] text-xs font-sans font-bold tracking-tight transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 px-2 space-y-3 bg-[#0A0E17]/98">
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <a
                href={SITE_CONFIG.links.discord}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 border border-white/20 text-xs font-mono text-slate-300"
              >
                Discord
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-xs font-mono text-slate-300"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-white text-black text-xs font-bold"
              >
                Sign Up / Join
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
