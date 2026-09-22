import { Link } from "@tanstack/react-router"
import { ExternalLink } from "lucide-react"
import { GithubIcon, LinkedinIcon, MeetupIcon, WhatsAppIcon } from "@/components/ui/icons"
import { BuilderBrandBadge } from "@/components/ui/BuilderBrandBadge"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0A] text-slate-300 relative overflow-hidden font-sans">
      {/* 1. Top Architectural Square Strip (Row 0: Exactly 64px true squares attached directly to Left Flank & Content) */}
      <div className="w-full h-14 md:h-16 border-b border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-row shrink-0">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-14 h-14 md:w-16 md:h-16 shrink-0 border-r border-white/10 transition-colors hover:bg-white/[0.03] flex items-center justify-center select-none"
            )}
          >
            {i === 0 && (
              <span className="text-white/20 font-mono text-[10px] select-none">+</span>
            )}
          </div>
        ))}
      </div>

      {/* 2. Middle Grid Section: Attached Left Flank (Col 0 & Col 1) + Content Area (Col 2..end) */}
      <div className="w-full flex flex-row items-stretch">
        {/* Left Flank: 2 Columns of True Squares (w-16 h-16 each, exactly 6 rows = 384px height) */}
        {/* Col 0 (0..64px) & Col 1 (64..128px) align seamlessly with Top Row Cell 0 & Cell 1 */}
        <div className="hidden md:flex flex-col w-32 shrink-0 border-r border-white/10 bg-[#0A0A0A] select-none">
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-row w-32 h-16 shrink-0 border-b border-white/10"
            >
              {/* Column 0: x = 0 to 64px */}
              <div className="w-16 h-16 shrink-0 border-r border-white/10 transition-colors hover:bg-white/[0.03] flex items-center justify-center">
                {rowIdx === 2 && (
                  <span className="text-white/15 font-mono text-[10px]">+</span>
                )}
              </div>
              {/* Column 1: x = 64px to 128px */}
              <div className="w-16 h-16 shrink-0 transition-colors hover:bg-white/[0.03] flex items-center justify-center">
                {rowIdx === 4 && (
                  <span className="text-white/10 font-mono text-[9px]">+</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content Column: Attached immediately to the right border of Left Flank (starts at x = 128px on desktop) */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Row 1 of Grid: Brand & Affiliation Bar (h-14 md:h-16 matches Row 0 of Left Flank with continuous border-b) */}
          <div className="w-full h-14 md:h-16 border-b border-white/10 bg-[#0D0D0D]/40 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 shrink-0">
            <BuilderBrandBadge size="sm" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300 hidden sm:inline">Affiliated with</span>
              <AwsSmileLogo size={42} color="#FFFFFF" />
            </div>
          </div>

          {/* Rows 2 to 6 of Grid: Navigation Columns (md:h-80 = 320px, matches Rows 1 to 5 of Left Flank) */}
          <div className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-0 md:h-80 flex flex-col justify-center flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
              {/* Mission Statement & Social Badges */}
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

              {/* Quick Navigation Directory */}
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

              {/* AWS Ecosystem Resources */}
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
        </div>
      </div>

      {/* 3. Bottom Architectural Square Strip (Row 7: Exactly 64px true squares attached directly to Left Flank & Content Column) */}
      <div className="w-full h-14 md:h-16 border-t border-b border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-row shrink-0">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-14 h-14 md:w-16 md:h-16 shrink-0 border-r border-white/10 transition-colors hover:bg-white/[0.03] flex items-center justify-center select-none"
            )}
          >
            {(i === 0 || i === 1) && (
              <span className="text-white/15 font-mono text-[10px] select-none">+</span>
            )}
          </div>
        ))}
      </div>

      {/* 4. Sub-Footer Bar */}
      <div className="w-full bg-[#080808]/90">
        <div className="w-full px-4 sm:px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 font-mono gap-4">
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
        </div>
      </div>
    </footer>
  )
}
