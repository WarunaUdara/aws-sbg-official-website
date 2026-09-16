import * as React from "react"
import { Link } from "@tanstack/react-router"
import { MessageSquare, ExternalLink, Shield } from "lucide-react"
import { GithubIcon, LinkedinIcon, MeetupIcon, WhatsAppIcon } from "@/components/ui/icons"
import { BuilderBrandBadge } from "@/components/ui/BuilderBrandBadge"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"
import { Container } from "./Container"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0E17] text-slate-400">
      {/* Top Banner Row with Brand Corners */}
      <div className="border-b border-white/10 bg-[#161F2E]/40">
        <Container size="lg" className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BuilderBrandBadge size="md" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">Affiliated with</span>
            <div className="flex items-center px-3 py-1 bg-[#161F2E] border border-white/10 text-white">
              <AwsSmileLogo size={42} color="#FFFFFF" />
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF9900]">
              [ FROM STUDENTS TO BUILDERS ]
            </h4>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed font-sans">
              AWS Student Builder Group at the University of Sri Jayewardenepura is an independent, student-run technical community fostering cloud architecture, serverless systems, GenAI pipelines, and peer builder culture.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.links.meetup}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#161F2E] border border-white/10 text-slate-300 hover:text-[#F64060] hover:border-[#F64060]/50 transition-colors"
                aria-label="Meetup Group"
                title="Meetup Group"
              >
                <MeetupIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#161F2E] border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
                aria-label="WhatsApp Channel"
                title="WhatsApp Channel"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#161F2E] border border-white/10 text-slate-300 hover:text-[#0077B5] hover:border-[#0077B5]/50 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#161F2E] border border-white/10 text-slate-300 hover:text-white hover:border-[#FF9900]/50 transition-colors"
                aria-label="GitHub Repository"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.discord}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#161F2E] border border-white/10 text-slate-300 hover:text-[#5865F2] hover:border-[#5865F2]/50 transition-colors"
                aria-label="Discord / Community"
                title="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase mb-4">
              Directory
            </h4>
            <ul className="space-y-2 text-sm font-sans">
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
              <li>
                <Link
                  to="/design-system"
                  className="hover:text-[#FF9900] text-amber-400/90 transition-colors font-mono text-xs"
                >
                  &gt; Design System
                </Link>
              </li>
            </ul>
          </div>

          {/* Cloud Resources */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-white tracking-widest uppercase mb-4">
              AWS Ecosystem
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <a
                  href="https://aws.amazon.com/developer/community/students/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                >
                  AWS Student Community
                  <ExternalLink className="w-3 h-3 text-slate-500" />
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
                  <ExternalLink className="w-3 h-3 text-slate-500" />
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
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Sign-off */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <p className="text-center sm:text-left">
            AWS Student Builder Group at University of Sri Jayewardenepura
          </p>
          <p className="text-center sm:text-right text-[#FF9900]/80">
            [ COORDINATE SYSTEM: 48px GRID • TANSTACK START ]
          </p>
        </div>
      </Container>
    </footer>
  )
}
