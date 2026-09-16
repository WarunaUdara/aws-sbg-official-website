import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight, Play } from "lucide-react"
import { HERO_CONFIG, SITE_CONFIG } from "@/lib/constants"
import { GithubIcon } from "@/components/ui/icons"

interface HeroProps {
  /**
   * Optional custom video URL. Defaults to HERO_CONFIG.videoUrl from constants.ts.
   * You can pass an external MP4/WebM URL or a local path like "/hero-bg.mp4"
   */
  videoUrl?: string
}

export function Hero({ videoUrl = HERO_CONFIG.videoUrl }: HeroProps) {
  // Verbs matching the reference design layout
  const [activeVerb, setActiveVerb] = React.useState<string>("GATEWAY")
  const [isVideoLoaded, setIsVideoLoaded] = React.useState<boolean>(false)

  const verbs = [
    { id: "DEPLOY", label: "DEPLOY", dimClass: "text-white/20 hover:text-white/60" },
    { id: "SCALE", label: "SCALE", dimClass: "text-white/35 hover:text-white/70" },
    { id: "GATEWAY", label: "GATEWAY", dimClass: "text-white/30 hover:text-white/70" },
    { id: "OBSERVE", label: "OBSERVE", dimClass: "text-white/25 hover:text-white/60" },
    { id: "PROTECT", label: "PROTECT", dimClass: "text-white/15 hover:text-white/50" },
  ]

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden bg-[#0A0E17] text-white select-none">
      {/* ========================================================================= */}
      {/* BACKGROUND VIDEO LAYER                                                    */}
      {/* Change video URL in src/lib/constants.ts -> HERO_CONFIG.videoUrl         */}
      {/* ========================================================================= */}
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-45" : "opacity-0"
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
          <source
            src={encodeURI(
              "/hero/Every great builder has value to share. Comment ‘BTS’ to start building..mp4"
            )}
            type="video/mp4"
          />
        </video>
      ) : null}

      {/* Fallback & Darkening Gradient Overlay */}
      <div className="absolute inset-0 bg-[#0A0E17]/65 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-black/40 z-10 pointer-events-none" />
      
      {/* Subtle Coordinate Grid (from design system) */}
      <div className="absolute inset-0 bg-builder-grid-dark opacity-40 z-10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* CENTER / UPPER HERO: MASSIVE STACKED ACTION VERBS (Reference Layout)     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 flex justify-center lg:justify-end">
        <div className="flex flex-col items-start font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-[1.08] lg:pr-12">
          {verbs.map((item) => {
            const isActive = activeVerb === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveVerb(item.id)}
                onMouseEnter={() => setActiveVerb(item.id)}
                className="flex items-center gap-3 sm:gap-5 transition-all duration-200 text-left focus:outline-none cursor-pointer group"
              >
                {/* Active Indicator Arrow (Electric Blue / AWS Orange Accent) */}
                <span
                  className={`transition-all duration-200 font-sans ${
                    isActive
                      ? "opacity-100 text-[#3B82F6] scale-105 inline-block"
                      : "opacity-0 -translate-x-2 text-transparent w-0 overflow-hidden"
                  }`}
                >
                  &rarr;
                </span>

                {/* Verb Label */}
                <span
                  className={
                    isActive
                      ? "text-white font-extrabold tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]"
                      : `${item.dimClass} font-semibold transition-colors`
                  }
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: HEADLINE, DESCRIPTION & DUAL ACTION CTAS                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          {/* Bottom Left: Headline & Body Copy */}
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1]">
              The Developer Platform <br />
              <span className="text-white">for Modern Cloud APIs</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-2xl leading-relaxed">
              AWS SBG USJ unifies student cloud infrastructure. Deploy serverless APIs instantly, 
              route global workloads through modern AWS architectures, and understand cloud usage in one place.
            </p>
          </div>

          {/* Bottom Right: Dual CTA Buttons (Matching Unkey Layout) */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3.5">
            {/* Primary CTA (Solid White Button) */}
            <Link
              to="/contact"
              className="px-6 py-3 bg-white hover:bg-slate-200 text-[#0A0E17] text-sm font-sans font-bold tracking-tight transition-all shadow-md active:scale-98"
            >
              Start for free
            </Link>

            {/* Secondary CTA (Dark Outlined Button) */}
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/10 border border-white/30 hover:border-white text-white text-sm font-sans font-medium transition-all active:scale-98"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
