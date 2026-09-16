import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Volume2, VolumeX } from "lucide-react"
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
  const [isMuted, setIsMuted] = React.useState<boolean>(false) // Default enabled
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // Handle autoplay with audio; fall back gracefully if browser restricts unmuted autoplay
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser autoplay policy restricted unmuted playback on initial load
        // Fall back to muted so video starts playing immediately
        video.muted = true
        setIsMuted(true)
        video.play().catch(() => {})
      })
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)

    if (video.paused) {
      video.play().catch(() => {})
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-end overflow-hidden bg-[#0A0E17] text-white">
      {/* ========================================================================= */}
      {/* SOUND TOGGLE BUTTON (Default Enabled)                                     */}
      {/* ========================================================================= */}
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8 z-30">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0A0E17]/85 hover:bg-[#161F2E] border border-white/20 hover:border-[#FF9900]/60 text-xs font-mono text-white transition-all backdrop-blur-md cursor-pointer rounded-none shadow-lg group select-none"
          aria-label={isMuted ? "Enable sound" : "Mute sound"}
          title={isMuted ? "Click to enable sound" : "Click to mute sound"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-white" />
              <span className="text-slate-300 group-hover:text-white">Sound: OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#FF9900] animate-pulse" />
              <span className="text-white font-bold">Sound: ON</span>
              <span className="w-1.5 h-1.5 bg-emerald-400 inline-block ml-0.5" />
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* BACKGROUND VIDEO LAYER - Clean, Vibrant, Unobstructed                     */}
      {/* ========================================================================= */}
      {videoUrl ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-85" : "opacity-80"
          }`}
        >
          <source src="/hero/hero-bg-video.webm" type="video/webm" />
          <source src="/hero/hero-bg-video.mp4" type="video/mp4" />
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
