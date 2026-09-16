import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight, Terminal, Sparkles, Cpu, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/Container"
import { BuilderChipLogo } from "@/components/ui/BuilderChipLogo"
import { AwsSmileLogo } from "@/components/ui/AwsSmileLogo"
import { BuilderBrandBadge } from "@/components/ui/BuilderBrandBadge"
import { BuilderMosaic } from "@/components/common/BuilderMosaic"

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-builder-grid-dark border-b border-white/10">
      {/* Subtle ambient light behind center */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF9900]/10 blur-[100px] pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Terminal Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161F2E] border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono tracking-wider uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>[ CHAPTER: USJ // FROM STUDENTS TO BUILDERS ]</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.05]">
                FROM STUDENTS <br />
                <span className="aws-gradient-text">TO BUILDERS.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-sans leading-relaxed pt-2">
                The official student engineering community at the{" "}
                <span className="text-white font-semibold">University of Sri Jayewardenepura</span>. 
                Learn cloud architecture, ship serverless apps, and build on AWS with hands-on labs and certifications.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <Link to="/events">
                <Button variant="glow" size="lg" className="w-full sm:w-auto font-mono text-sm">
                  Explore Workshops
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-mono text-sm border-white/20 hover:border-[#FF9900]">
                  Join Guild Community
                </Button>
              </Link>
            </div>

            {/* Monospace Signature Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-8 h-8 bg-[#FF9900] flex items-center justify-center shrink-0">
                <BuilderChipLogo size={18} color="#0A0E17" />
              </div>
              <p className="text-xs font-mono text-slate-400">
                AWS Student Builder Group at University of Sri Jayewardenepura
              </p>
            </div>
          </div>

          {/* Right Architectural Mosaic Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative p-4 sm:p-6 bg-[#161F2E]/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-4 max-w-md w-full">
              {/* Header inside frame */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF9900]" />
                  <span className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                    BUILDER_CENTER.SYS
                  </span>
                </div>
                <div className="flex items-center px-2 py-0.5 bg-[#0A0E17] border border-white/10">
                  <AwsSmileLogo size={32} color="#FFFFFF" />
                </div>
              </div>

              {/* Stepped Pixel Mosaic Visual */}
              <div className="py-2 flex justify-center">
                <BuilderMosaic density="compact" />
              </div>

              {/* Core Team & Rewards Callout */}
              <div className="p-3.5 bg-[#0A0E17] border border-[#FF9900]/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#FF9900]">
                  <span>[ CORE-TEAM ]</span>
                  <span>AWS CREDITS + CERTS</span>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  Earn AWS Skill Builder vouchers, credits, and guidance from certified peer architects.
                </p>
              </div>

              {/* Monospace Micro-Coordinates */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span>GRID: 48px × 48px</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
