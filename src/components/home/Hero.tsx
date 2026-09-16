import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Volume2, VolumeX, Calendar } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/icons"
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
  const sectionRef = React.useRef<HTMLElement>(null)
  const isHeroInViewRef = React.useRef<boolean>(true)

  // Default volume set to half (50%)
  const DEFAULT_VOLUME = 0.5

  // Handle autoplay with audio; fall back gracefully if browser restricts unmuted autoplay
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = DEFAULT_VOLUME
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

  // 1. Stop video and disable sound when scrolling to the next section
  // 2. Resume video (muted) when scrolling back into the hero section
  React.useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let isInitialMount = true

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2

          if (!isVisible) {
            // Scrolled out of view / user moved to the next section
            isHeroInViewRef.current = false
            if (!video.paused) {
              video.pause()
            }
            // Disable sound even if it was previously enabled
            video.muted = true
            setIsMuted(true)
          } else {
            // Scrolled back into hero section
            isHeroInViewRef.current = true
            if (!isInitialMount && !document.hidden) {
              // Resumes playing muted because sound was disabled on scroll out
              video.play().catch(() => {})
            }
          }
        }
        isInitialMount = false
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5],
      }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Stop video and disable sound when user leaves the tab to another non-relevant tab
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current
      if (!video) return

      if (document.hidden) {
        // User switched to another tab
        if (!video.paused) {
          video.pause()
        }
        // Disable sound even if it was previously enabled
        video.muted = true
        setIsMuted(true)
      } else {
        // User returned to this tab; only resume if the hero section is currently in view
        if (isHeroInViewRef.current) {
          // Resumes playing muted because sound was disabled on tab leave
          video.play().catch(() => {})
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    video.volume = DEFAULT_VOLUME
    video.muted = nextMuted
    setIsMuted(nextMuted)

    if (video.paused) {
      video.play().catch(() => {})
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-end overflow-hidden bg-[#0A0E17] text-white"
    >
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
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = DEFAULT_VOLUME
          }}
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
          className={`absolute -top-6 sm:top-0 inset-x-0 w-full h-[88%] sm:h-full object-cover [object-position:center_18%] sm:[object-position:center_center] z-0 pointer-events-none transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-85" : "opacity-80"
          }`}
        >
          <source src="/hero/hero-bg-video.webm" type="video/webm" />
          <source src="/hero/hero-bg-video.mp4" type="video/mp4" />
        </video>
      ) : null}

      {/* Top subtle fade to keep navbar navigation readable */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 hero-top-scrim z-10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* BOTTOM DARK FADING OVERLAY FOR THE VIDEO                                 */}
      {/* Mathematically eased multi-stop scrim gradient for ultra-smooth fading    */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] sm:h-[78%] lg:h-[84%] hero-bottom-scrim z-10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: HEADLINE, DESCRIPTION & DUAL ACTION CTAS                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          {/* Bottom Left: Headline & Body Copy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/20 text-xs font-mono uppercase tracking-wider text-[#FF9900]">
              <img src="/icons/sbg-icon-only.png" alt="AWS SBG" className="w-4 h-4 object-contain shrink-0" />
              <span>AWS Student Builder Group USJ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08] text-balance">
              Where Student Builders <br />
              <span className="aws-gradient-text">Architect the Cloud.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl leading-relaxed text-pretty">
              Build real cloud systems at USJ. Learn AWS, explore GenAI with Amazon Bedrock, and launch production projects with student developers.
            </p>
          </div>

          {/* Bottom Right: Dual Student Action CTAs */}
          <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-3.5">
            {/* Primary CTA (WhatsApp Channel) */}
            <a
              href={SITE_CONFIG.links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#0A0E17] text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-lg active:scale-98 rounded-none cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0E17]" />
              <span>Join WhatsApp</span>
            </a>

            {/* Secondary CTA (Explore Workshops) */}
            <Link
              to="/events"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#0A0E17]/80 hover:bg-white/10 border border-white/25 hover:border-white text-white text-sm font-mono font-semibold tracking-wider uppercase transition-all active:scale-98 rounded-none cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-[#FF9900]" />
              <span>View Workshops</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
