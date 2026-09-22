import { Link } from "@tanstack/react-router"
import { ExternalLink } from "lucide-react"
import { GithubIcon, LinkedinIcon, MeetupIcon, WhatsAppIcon } from "@/components/ui/icons"
import { BuilderBrandBadge } from "@/components/ui/BuilderBrandBadge"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"
import { Container } from "./Container"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0A] text-slate-300 relative overflow-hidden">
      {/* 1. Top Architectural Tile Grid Strip (Plain Line Squares) */}
      <div className="w-full border-b border-white/10 bg-[#0D0D0D]/60 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-10 sm:h-12 border-r border-white/10 transition-colors hover:bg-white/[0.02] flex items-center justify-center",
              i >= 6 && "hidden sm:block",
              i >= 8 && "hidden md:block"
            )}
          >
            {i === 0 && (
              <span className="text-white/20 font-mono text-[10px] select-none hidden sm:inline">
                +
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 2. Brand & Affiliation Row */}
      <div className="border-b border-white/10 bg-[#121212]/40">
        <Container size="lg" className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BuilderBrandBadge size="md" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 hidden sm:inline">Affiliated with</span>
            <AwsSmileLogo size={46} color="#FFFFFF" />
          </div>
        </Container>
      </div>

      {/* 3. Main Footer Content with Left Flank of Plain Line Squares */}
      <Container size="lg" className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Flank: Plain Line Squares (Wireframe Architectural Tiles) */}
          <div className="hidden lg:flex flex-col border border-white/10 w-16 xl:w-20 shrink-0 bg-[#0D0D0D] divide-y divide-white/10 self-start shadow-xl">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-square border-white/10 hover:bg-white/[0.02] transition-colors flex items-center justify-center"
              >
                <span className="text-white/20 font-mono text-[10px] select-none">+</span>
              </div>
            ))}
          </div>

          {/* Main Footer Navigation Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Mission Column */}
            <div className="sm:col-span-2 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF9900]">
                Our Mission
              </h4>
              <p className="text-sm sm:text-base text-slate-200 max-w-md leading-relaxed font-sans">
                Democratizing cloud education at USJ through hands-on architectures, certification study cohorts, and builder mentorship.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={SITE_CONFIG.links.meetup}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-[#151515] border border-white/10 text-slate-300 hover:text-[#F64060] hover:border-[#F64060]/50 transition-colors rounded-none shrink-0"
                  aria-label="Meetup Group"
                  title="Meetup Group"
                >
                  <MeetupIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-[#151515] border border-white/10 text-slate-300 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors rounded-none shrink-0"
                  aria-label="WhatsApp Channel"
                  title="WhatsApp Channel"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-[#151515] border border-white/10 text-slate-300 hover:text-[#0077B5] hover:border-[#0077B5]/50 transition-colors rounded-none shrink-0"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-[#151515] border border-white/10 text-slate-300 hover:text-white hover:border-[#FF9900]/50 transition-colors rounded-none shrink-0"
                  aria-label="GitHub Repository"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase mb-4">
                Directory
              </h4>
              <ul className="space-y-2.5 text-sm sm:text-[15px] font-sans text-slate-200">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover:text-[#FF9900] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cloud Resources */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase mb-4">
                AWS Ecosystem
              </h4>
              <ul className="space-y-2.5 text-sm sm:text-[15px] font-sans text-slate-200">
                <li>
                  <a
                    href="https://aws.amazon.com/developer/community/students/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                  >
                    AWS Student Community
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://aws.amazon.com/training/digital/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                  >
                    AWS Skill Builder
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.links.awsAcademy}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                  >
                    AWS Academy LMS
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONFIG.links.usj}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                  >
                    USJ Official Portal
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Bottom Architectural Tile Grid Strip (Plain Line Squares) */}
      <div className="w-full border-t border-b border-white/10 bg-[#0D0D0D] grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-12 sm:h-14 md:h-16 border-r border-white/10 transition-colors hover:bg-white/[0.02] flex items-center justify-center",
              i >= 6 && "hidden sm:block",
              i >= 8 && "hidden md:block"
            )}
          >
            {(i === 0 || i === 11) && (
              <span className="text-white/15 font-mono text-[10px] select-none hidden sm:inline">
                +
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 5. Bottom Sub-Footer Bar */}
      <Container size="lg" className="py-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 font-mono gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <a
            href={SITE_CONFIG.links.meetup}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F64060] transition-colors"
          >
            Meetup
          </a>
          <a
            href={SITE_CONFIG.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#25D366] transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0077B5] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-center sm:text-right text-slate-400 text-xs font-mono">
          © {new Date().getFullYear()} AWS SBG USJ • University of Sri Jayewardenepura
        </p>
      </Container>
    </footer>
  )
}
