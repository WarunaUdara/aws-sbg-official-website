import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { GithubIcon, MeetupIcon, WhatsAppIcon } from "@/components/ui/icons"

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
            <div className="flex h-9 w-9 items-center justify-center bg-[#161F2E] border border-white/20 group-hover:border-[#FF9900] transition-colors p-1 shrink-0">
              <img src="/icons/sbg-icon-only.png" alt="AWS Student Builder Group USJ" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center text-left">
              <span className="font-bold text-sm sm:text-[15px] tracking-tight text-white group-hover:text-[#FF9900] transition-colors leading-tight font-display">
                AWS Student Builder Group
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-slate-300 leading-tight">
                University of Sri Jayewardenepura
              </span>
            </div>
          </Link>

          {/* Center / Right Navigation Links (Unkey layout) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-200 font-sans">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? "text-[#FF9900] font-semibold" : "text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Units: WhatsApp, Meetup, GitHub, Join Us */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* WhatsApp Channel */}
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-white/30 bg-[#161F2E]/60 hover:bg-[#161F2E] text-xs font-mono text-slate-200 hover:text-white transition-all rounded-none"
              title="Join our WhatsApp Channel"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Meetup Group */}
            <a
              href={SITE_CONFIG.links.meetup}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-white/30 bg-[#161F2E]/60 hover:bg-[#161F2E] text-xs font-mono text-slate-200 hover:text-white transition-all rounded-none"
              title="RSVP on Meetup"
            >
              <MeetupIcon className="w-3.5 h-3.5" />
              <span>Meetup</span>
            </a>

            {/* GitHub Repo */}
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-white/15 hover:border-white text-slate-200 hover:text-white transition-all bg-[#0A0E17] rounded-none"
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            {/* Join Us CTA */}
            <Link
              to="/contact"
              className="px-4 py-1.5 bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#0A0E17] text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-none"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
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
                  className="px-3 py-2 text-sm sm:text-base text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 bg-[#161F2E]/60 text-xs font-mono text-slate-200"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={SITE_CONFIG.links.meetup}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 bg-[#161F2E]/60 text-xs font-mono text-slate-200"
              >
                <MeetupIcon className="w-3.5 h-3.5" />
                <span>Meetup</span>
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-xs font-mono text-slate-200"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-[#FF9900] text-[#0A0E17] text-xs font-mono font-bold uppercase tracking-wider"
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
