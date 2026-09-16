import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Palette, Type, Grid, Cpu, Layers, Sparkles, Check, Copy } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BuilderChipLogo } from '@/components/ui/BuilderChipLogo'
import { AwsSmileLogo } from '@/components/ui/AwsSmileLogo'
import { BuilderBrandBadge } from '@/components/ui/BuilderBrandBadge'
import { BuilderMosaic } from '@/components/common/BuilderMosaic'

export const Route = createFileRoute('/design-system')({
  component: DesignSystemPage,
})

const COLOR_TOKENS = [
  {
    name: 'Builder Orange',
    role: 'Primary Brand / Hero Fill / CTAs',
    hex: '#FF9900',
    oklch: 'oklch(0.72 0.18 55.0)',
    bgClass: 'bg-[#FF9900]',
    textClass: 'text-[#0A0E17]',
  },
  {
    name: 'Builder Orange Light',
    role: 'Hover States / Glow Accents',
    hex: '#FFB84D',
    oklch: 'oklch(0.80 0.14 62.0)',
    bgClass: 'bg-[#FFB84D]',
    textClass: 'text-[#0A0E17]',
  },
  {
    name: 'Builder Dark Canvas',
    role: 'Primary Background / Dark Elements',
    hex: '#0A0E17',
    oklch: 'oklch(0.14 0.02 260.0)',
    bgClass: 'bg-[#0A0E17]',
    textClass: 'text-white border border-white/20',
  },
  {
    name: 'Builder Slate Surface',
    role: 'Cards / Mosaic Blocks / Anchors',
    hex: '#161F2E',
    oklch: 'oklch(0.22 0.03 255.0)',
    bgClass: 'bg-[#161F2E]',
    textClass: 'text-white border border-white/10',
  },
]

function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(text)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  return (
    <div className="py-12 md:py-20 bg-[#0A0E17] text-white">
      <Container size="lg">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161F2E] border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            <span>[ SYSTEM SPECIFICATION // V1.0 ]</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display text-white">
            AWS SBG USJ <span className="aws-gradient-text">Design System</span>
          </h1>
          <p className="text-slate-300 text-base font-sans leading-relaxed">
            The definitive design system and component specification derived from the official brand identity.
            Engineered for developers, designers, and AI agents to craft unified, technical interfaces.
          </p>
        </div>

        {/* Section 1: Color Palette Matrix */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2.5 h-2.5 bg-[#FF9900]" />
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider">
              01. Official Color Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.name}
                className="p-5 bg-[#161F2E] border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className={`h-24 w-full ${token.bgClass} flex items-end p-2.5 shadow-inner`}>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 ${token.textClass}`}>
                    {token.hex}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">
                    {token.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {token.role}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-2">
                    {token.oklch}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(token.hex)}
                  className="w-full py-1.5 px-2 bg-[#0A0E17] hover:bg-[#1E2B3E] border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedToken === token.hex ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Hex
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Token
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography Pairing */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2.5 h-2.5 bg-[#FF9900]" />
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider">
              02. Typography Pairing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Font: Space Grotesk */}
            <div className="p-6 bg-[#161F2E] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono text-[#FF9900] font-bold">[ PRIMARY DISPLAY & BODY ]</span>
                <span className="text-xs font-mono text-slate-400">Google Fonts</span>
              </div>
              <h3 className="text-2xl font-black font-display text-white">
                Space Grotesk
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Applied to all high-impact headlines, navigation items, buttons, and readable body paragraphs.
                Offers clean geometric proportions, high x-height, and architectural crispness.
              </p>
              <div className="pt-2 space-y-2 border-t border-white/5 font-display">
                <div className="text-3xl font-black">Aa Bb Cc 123 - Black 900</div>
                <div className="text-xl font-bold">From Students to Builders - Bold 700</div>
                <div className="text-sm font-normal text-slate-300">Clean geometric paragraph text for comfortable reading.</div>
              </div>
            </div>

            {/* Secondary Font: JetBrains Mono */}
            <div className="p-6 bg-[#161F2E] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono text-[#FF9900] font-bold">[ SECONDARY MONOSPACE ]</span>
                <span className="text-xs font-mono text-slate-400">Google Fonts</span>
              </div>
              <h3 className="text-2xl font-black font-mono text-white">
                JetBrains Mono
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Applied to brand signatures, eyebrows, terminal headers (<span className="font-mono text-[#FF9900]">Launching soon...</span>),
                cloud coordinates, metrics, and tags.
              </p>
              <div className="pt-2 space-y-2 border-t border-white/5 font-mono">
                <div className="text-base text-[#FF9900] font-bold">
                  AWS Student Builder Group at University of Sri Jayewardenepura
                </div>
                <div className="text-xs text-slate-400">
                  [ STATUS: 200 OK // 48px GRID SYSTEM ]
                </div>
                <div className="text-xs text-slate-300">
                  0123456789 (const aws = new CDK.Stack())
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The 7x7 Builder Chip Glyph */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2.5 h-2.5 bg-[#FF9900]" />
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider">
              03. The 7×7 Builder Chip Glyph
            </h2>
          </div>

          <div className="p-8 bg-[#161F2E] border border-white/10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-lg font-bold font-display text-white">
                Iconic Hardware-Software Silicon Motif
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Derived directly from the official graphics. Formed of an outer 5×5 square ring with a 3×3 hollow center,
                augmented by 3 modular pins per side (12 leads total), mapped onto an exact 7×7 coordinate grid.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {/* Variation A: Orange on Dark */}
              <div className="p-6 bg-[#0A0E17] border border-white/10 flex flex-col items-center justify-center space-y-4">
                <BuilderChipLogo size={56} color="#FF9900" />
                <span className="text-xs font-mono text-slate-400">Orange on Dark Canvas</span>
              </div>

              {/* Variation B: Dark on Orange */}
              <div className="p-6 bg-[#FF9900] border border-[#FF9900] flex flex-col items-center justify-center space-y-4">
                <BuilderChipLogo size={56} color="#0A0E17" />
                <span className="text-xs font-mono text-[#0A0E17] font-bold">Dark on Builder Orange</span>
              </div>

              {/* Variation C: Framed Corner Block */}
              <div className="p-6 bg-[#0A0E17] border border-white/10 flex flex-col items-center justify-center space-y-4">
                <div className="p-3 bg-[#161F2E] border border-[#FF9900]/40">
                  <BuilderChipLogo size={36} color="#FF9900" />
                </div>
                <span className="text-xs font-mono text-slate-400">Framed Anchor Block</span>
              </div>
            </div>

            {/* Official Signature Badge Display */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-[#FF9900] mb-4 tracking-wider">
                [ OFFICIAL COMBINED BRAND BADGE ]
              </h4>
              <div className="p-4 bg-[#0A0E17] border border-white/10 flex items-center justify-between flex-wrap gap-4">
                <BuilderBrandBadge size="lg" />
                <div className="px-3 py-1 bg-[#161F2E] border border-white/10">
                  <AwsSmileLogo size={44} color="#FFFFFF" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Architectural Grid & Mosaic System */}
        <section className="mb-20 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2.5 h-2.5 bg-[#FF9900]" />
            <h2 className="text-xl font-bold font-display text-white uppercase tracking-wider">
              04. Modular Grid & Mosaic System
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Grid Pattern Demo */}
            <div className="p-6 bg-builder-grid-dark border border-white/10 space-y-4 min-h-[260px] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#FF9900]">[ 48px × 48px ARCHITECTURAL GRID ]</span>
                <h4 className="text-lg font-bold font-display text-white mt-1">Dark Coordinate Canvas</h4>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  1px coordinate lines with 7% white opacity against deep dark <span className="font-mono">#0A0E17</span>.
                </p>
              </div>
              <div className="p-3 bg-[#161F2E]/90 border border-white/20 font-mono text-xs text-[#FF9900] w-fit">
                class: .bg-builder-grid-dark
              </div>
            </div>

            {/* Mosaic Stepped Blocks Demo */}
            <div className="p-6 bg-[#161F2E] border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#FF9900]">[ STEPPED BUILDER MOSAIC ]</span>
                <h4 className="text-lg font-bold font-display text-white mt-1">Pixelated Architectural Blocks</h4>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  Replicates the mosaic seen in the official banners and teaser graphics.
                </p>
              </div>
              <div className="flex justify-center py-2">
                <BuilderMosaic density="compact" />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
