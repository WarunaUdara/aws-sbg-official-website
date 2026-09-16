import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Menu, X, ArrowUpRight, Palette } from "lucide-react"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { Container } from "./Container"
import { Button } from "@/components/ui/button"
import { BuilderChipLogo } from "@/components/ui/BuilderChipLogo"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const allNavLinks = [
    ...NAV_LINKS,
    { label: "Design System", href: "/design-system" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0E17]/90 backdrop-blur-xl">
      <Container size="lg">
        <div className="flex h-18 items-center justify-between">
          {/* Logo & Official Brand Mark */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="flex h-11 w-11 items-center justify-center bg-[#161F2E] border border-[#FF9900]/40 text-[#FF9900] group-hover:border-[#FF9900] transition-colors shadow-sm">
              <BuilderChipLogo size={24} color="#FF9900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-[#FF9900] transition-colors font-display">
                  AWS SBG
                </span>
                <span className="bg-[#FF9900] px-1.5 py-0.2 text-[10px] font-mono font-bold tracking-wider text-[#0A0E17] uppercase">
                  USJ
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                University of Sri Jayewardenepura
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {allNavLinks.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "text-[#FF9900] bg-[#FF9900]/10 border-b-2 border-[#FF9900] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action CTAs & AWS Badge */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center px-3 py-1 bg-[#161F2E] border border-white/10 text-white">
              <AwsSmileLogo size={38} color="#FFFFFF" />
            </div>
            <Link to="/contact">
              <Button variant="glow" size="sm" className="font-mono text-xs">
                Join Community
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 px-2 space-y-2 bg-[#0A0E17]/98 backdrop-blur-2xl">
            {allNavLinks.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium ${
                    isActive
                      ? "text-[#FF9900] bg-[#FF9900]/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center px-3 py-1 bg-[#161F2E] border border-white/10 text-white">
                <AwsSmileLogo size={36} color="#FFFFFF" />
              </div>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="glow" size="sm" className="font-mono text-xs">
                  Join Community
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
