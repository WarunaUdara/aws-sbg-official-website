import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Cloud, Menu, X, ArrowUpRight, Users } from "lucide-react"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { Container } from "./Container"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <Container size="lg">
        <div className="flex h-18 items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF9900] to-[#E68A00] text-slate-950 shadow-md group-hover:scale-105 transition-transform">
              <Cloud className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-[#FF9900] transition-colors">
                  AWS SBG
                </span>
                <span className="rounded bg-[#FF9900]/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#FF9900] uppercase">
                  USJ
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                University of Sri Jayewardenepura
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#FF9900] bg-[#FF9900]/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="glow" size="sm">
                <Users className="w-4 h-4" />
                Join Community
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800/80 py-4 px-2 space-y-2 bg-slate-950/95 backdrop-blur-xl">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-[#FF9900] bg-[#FF9900]/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="glow" size="md" className="w-full">
                  Join Community
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
