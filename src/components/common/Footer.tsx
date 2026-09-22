import { Link } from "@tanstack/react-router"
import { ExternalLink } from "lucide-react"
import { GithubIcon, LinkedinIcon, MeetupIcon, WhatsAppIcon } from "@/components/ui/icons"
import { BuilderBrandBadge } from "@/components/ui/BuilderBrandBadge"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"
import { Container } from "./Container"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

/**
 * Graphic Tile 1: Stepped Builder Block Mosaic
 * Alternating AWS Orange (#FF9900), Pure White (#FFFFFF), and Obsidian (#0D0D0D)
 */
function AwsSteppedBlockTile({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full grid grid-cols-4 grid-rows-4 gap-[1px] bg-white/10 p-[1px] select-none",
        className
      )}
      aria-hidden="true"
    >
      <div className="bg-[#FF9900]" />
      <div className="bg-[#0D0D0D]" />
      <div className="bg-[#FF9900]" />
      <div className="bg-[#0D0D0D]" />

      <div className="bg-[#0D0D0D]" />
      <div className="bg-[#FF9900]" />
      <div className="bg-white" />
      <div className="bg-[#FF9900]" />

      <div className="bg-[#FF9900]" />
      <div className="bg-white" />
      <div className="bg-[#0D0D0D]" />
      <div className="bg-[#FF9900]" />

      <div className="bg-[#0D0D0D]" />
      <div className="bg-[#FF9900]" />
      <div className="bg-[#FF9900]" />
      <div className="bg-white" />
    </div>
  )
}

/**
 * Graphic Tile 2: Digital Architecture Signal Lines
 * Horizontal cloud telemetry & data bus stripes in AWS builder colors
 */
function AwsSignalBarsTile({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col justify-between p-2 sm:p-2.5 bg-[#0D0D0D] select-none",
        className
      )}
      aria-hidden="true"
    >
      <div className="h-1.5 w-full bg-[#FF9900]" />
      <div className="h-1.5 w-3/4 bg-white/90" />
      <div className="h-1.5 w-full flex gap-1">
        <div className="h-full w-2/3 bg-[#FF9900]" />
        <div className="h-full w-1/3 bg-white" />
      </div>
      <div className="h-1.5 w-1/2 bg-[#FF9900]" />
      <div className="h-1.5 w-full flex gap-1">
        <div className="h-full w-1/4 bg-white/90" />
        <div className="h-full w-3/4 bg-[#FF9900]" />
      </div>
      <div className="h-1.5 w-5/6 bg-[#FF9900]" />
    </div>
  )
}

/**
 * Graphic Tile 3: Pixel Matrix Mosaic
 * Dense generative pixel matrix recreating the digital corner art
 */
function AwsPixelMosaicTile({ className }: { className?: string }) {
  const cells = [
    1, 0, 1, 1, 0, 2,
    0, 1, 0, 2, 1, 0,
    1, 2, 0, 0, 1, 1,
    0, 1, 1, 1, 0, 2,
    2, 0, 1, 0, 1, 0,
    1, 1, 0, 2, 0, 1,
  ] // 1 = #FF9900, 2 = white, 0 = black
  return (
    <div
      className={cn(
        "w-full h-full grid grid-cols-6 grid-rows-6 gap-[1px] bg-white/10 p-[1px] select-none",
        className
      )}
      aria-hidden="true"
    >
      {cells.map((v, i) => (
        <div
          key={i}
          className={cn(
            "w-full h-full",
            v === 1 && "bg-[#FF9900]",
            v === 2 && "bg-white",
            v === 0 && "bg-[#0D0D0D]"
          )}
        />
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0A] text-slate-300 relative overflow-hidden">
      {/* 1. Top Architectural Tile Grid Strip */}
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

      {/* 2. Top Banner Row with Brand Corners */}
      <div className="border-b border-white/10 bg-[#121212]/40">
        <Container size="lg" className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BuilderBrandBadge size="md" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 hidden sm:inline">Affiliated with</span>
            <AwsSmileLogo size={46} color="#FFFFFF" />
          </div>
        </Container>
      </div>

      {/* 3. Main Footer Content with Left Flank of Design Tiles */}
      <Container size="lg" className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Flank Graphic Tile Column (Render-style stepped architectural blocks) */}
          <div className="hidden lg:flex flex-col border border-white/10 w-24 xl:w-28 shrink-0 bg-[#0D0D0D] divide-y divide-white/10 self-start shadow-xl">
            <div className="w-full aspect-square p-2 bg-[#0D0D0D]">
              <AwsSteppedBlockTile />
            </div>
            <div className="w-full aspect-square p-2 bg-[#0D0D0D]">
              <AwsSignalBarsTile />
            </div>
            <div className="w-full aspect-square p-2 bg-[#0D0D0D]">
              <AwsPixelMosaicTile />
            </div>
            <div className="w-full aspect-square p-2 bg-[#0D0D0D] flex items-center justify-center hover:bg-white/[0.03] transition-colors">
              <span className="text-[#FF9900]/40 font-mono text-xs select-none">+</span>
            </div>
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

      {/* 4. Bottom Architectural Tile Grid Strip (Render-style) */}
      <div className="w-full border-t border-b border-white/10 bg-[#0D0D0D] grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 overflow-hidden">
        {/* Tile 1: Stepped Builder Block */}
        <div className="h-14 sm:h-16 md:h-20 border-r border-white/10 p-1.5 sm:p-2 bg-[#0D0D0D]">
          <AwsSteppedBlockTile />
        </div>

        {/* Tile 2: Signal Bars */}
        <div className="h-14 sm:h-16 md:h-20 border-r border-white/10 p-1.5 sm:p-2 bg-[#0D0D0D]">
          <AwsSignalBarsTile />
        </div>

        {/* Tile 3: Pixel Mosaic (visible on sm+) */}
        <div className="h-14 sm:h-16 md:h-20 border-r border-white/10 p-1.5 sm:p-2 bg-[#0D0D0D] hidden sm:block">
          <AwsPixelMosaicTile />
        </div>

        {/* Middle Empty Grid Tiles with subtle hover */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-14 sm:h-16 md:h-20 border-r border-white/10 transition-colors hover:bg-[#FF9900]/[0.03]",
              // Responsive col control so total col count equals grid-cols definition
              i >= 3 && "hidden sm:block",
              i >= 5 && "hidden md:block"
            )}
          />
        ))}

        {/* Far Right Tile: Pixel Mosaic corner anchor */}
        <div className="h-14 sm:h-16 md:h-20 border-l sm:border-l-0 border-r border-white/10 p-1.5 sm:p-2 bg-[#0D0D0D]">
          <AwsPixelMosaicTile />
        </div>
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
