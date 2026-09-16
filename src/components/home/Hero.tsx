import * as React from "react"
import { Link } from "@tanstack/react-router"
import { HERO_CONFIG, SITE_CONFIG } from "@/lib/constants"

interface HeroProps {
  /**
   * Optional custom video URL. Defaults to HERO_CONFIG.videoUrl from constants.ts.
   * You can pass an external MP4/WebM URL or a local path like "/hero/hero-bg.mp4"
   */
  videoUrl?: string
}

export function Hero({ videoUrl = HERO_CONFIG.videoUrl }: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState<boolean>(false)

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-end overflow-hidden bg-[#0A0E17] text-white">
      {/* ========================================================================= */}
      {/* BACKGROUND VIDEO LAYER - Clean, Vibrant, Unobstructed                     */}
      {/* ========================================================================= */}
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-85" : "opacity-0"
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

      {/* Top subtle fade to keep navbar navigation readable */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0E17]/90 via-[#0A0E17]/40 to-transparent z-10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* BOTTOM DARK FADING OVERLAY FOR THE VIDEO                                 */}
      {/* Seamless cinematic gradient fading smoothly into the next dark section   */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-80 sm:h-96 lg:h-[480px] bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/85 to-transparent z-10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: HEADLINE, DESCRIPTION & DUAL ACTION CTAS                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          {/* Bottom Left: Headline & Body Copy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/20 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <span className="w-1.5 h-1.5 bg-[#FF9900] inline-block" />
              <span>AWS Student Builder Group • USJ Chapter</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
              The Developer Platform <br />
              <span className="aws-gradient-text">for Modern Cloud APIs</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl leading-relaxed">
              AWS SBG USJ unifies student cloud infrastructure at the University of Sri Jayewardenepura. 
              Deploy serverless APIs instantly, route global workloads with AWS, and master cloud engineering together.
            </p>
          </div>

          {/* Bottom Right: Dual CTA Buttons (Matching Unkey Layout) */}
          <div className="lg:col-span-4 flex items-center lg:justify-end gap-3.5">
            {/* Primary CTA (Solid White Button) */}
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white hover:bg-slate-200 text-[#0A0E17] text-sm font-sans font-bold tracking-tight transition-all shadow-md active:scale-98 rounded-none cursor-pointer"
            >
              Start for free
            </Link>

            {/* Secondary CTA (Dark Outlined Button) */}
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0A0E17]/60 hover:bg-white/10 border border-white/25 hover:border-white text-white text-sm font-sans font-medium transition-all active:scale-98 rounded-none cursor-pointer backdrop-blur-sm"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
