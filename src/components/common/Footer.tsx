import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Cloud, MessageSquare, ExternalLink } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"
import { Container } from "./Container"
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-400">
      <Container size="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF9900] to-[#E68A00] text-slate-950 shadow-md">
                <Cloud className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  AWS SBG USJ
                </span>
                <p className="text-xs text-slate-400">
                  {SITE_CONFIG.university}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              AWS Student Building Guild at the University of Sri Jayewardenepura is an independent, student-run community fostering cloud innovation, builder culture, and technical excellence with Amazon Web Services.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#0077B5] hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.discord}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#5865F2] hover:border-slate-700 transition-colors"
                aria-label="Discord / Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
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

          {/* Resources & University */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
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

        {/* Bottom Disclaimer and Copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} AWS SBG USJ. Built by student builders for student builders.
          </p>
          <p className="flex items-center gap-1 text-center sm:text-right">
            <span>Powered by TanStack Start & AWS Community</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
