export const SITE_CONFIG = {
  name: "AWS Student Building Guild - USJ",
  shortName: "AWS SBG USJ",
  university: "University of Sri Jayewardenepura",
  tagline: "Where Student Builders Architect the Cloud",
  description: "Learn AWS by building real systems. Explore generative AI with Amazon Bedrock, architect serverless cloud infrastructure, and launch production grade projects with the student developer community at University of Sri Jayewardenepura.",
  url: "https://github.com/WarunaUdara/aws-sbg-official-website",
  githubStars: "1.2k",
  links: {
    github: "https://github.com/WarunaUdara/aws-sbg-official-website",
    linkedin: "https://www.linkedin.com/company/aws-sbg-usj/",
    meetup: "https://www.meetup.com/aws-sbg-at-univ-of-sri-jayewardenepura-mattegoda-campus/",
    whatsapp: "https://whatsapp.com/channel/0029VbDAVOpAjPXPsgKZTW0p",
    discord: "https://discord.gg/aws-sbg-usj",
    usj: "https://www.sjp.ac.lk/",
  },
  stats: [
    { label: "Active Student Builders", value: "350+" },
    { label: "Workshops & Bootcamps", value: "24+" },
    { label: "AWS Certifications Pursued", value: "40+" },
    { label: "Cloud Projects Built", value: "15+" },
  ],
}

/**
 * Hero Section Configuration
 * --------------------------
 * The user can change the videoUrl link here at any time.
 * To use a local video: place your MP4/WebM in the /public folder (e.g. "/hero-bg-video.webm")
 * and set videoUrl: "/hero-bg-video.webm".
 */
export const HERO_CONFIG = {
  // === BACKGROUND VIDEO URL ===
  // Served from public/hero/
  videoUrl: "/hero/hero-bg-video.webm",
  // Video overlay opacity (0 to 1) to guarantee high text contrast
  videoOverlayOpacity: 0.65,

  // Large vertical stacked verbs in background/focal area
  verbs: [
    { id: "deploy", text: "DEPLOY", active: false },
    { id: "scale", text: "SCALE", active: false },
    { id: "gateway", text: "GATEWAY", active: true, showArrow: true },
    { id: "observe", text: "OBSERVE", active: false },
    { id: "protect", text: "PROTECT", active: false },
  ],

  // Bottom Left Headline & Description
  headline: "Where Student Builders\nArchitect the Cloud",
  description:
    "Learn AWS by building real systems. Explore generative AI with Amazon Bedrock, architect serverless cloud infrastructure, and launch production grade projects with the student developer community at University of Sri Jayewardenepura.",

  // Bottom Right CTA Action Buttons
  primaryCta: {
    label: "Start Building",
    href: "/contact",
  },
  secondaryCta: {
    label: "View on GitHub",
    href: "https://github.com/WarunaUdara/aws-sbg-official-website",
  },
}

export const NAV_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Workshops & Events", href: "/events" },
  { label: "Student Projects", href: "/projects" },
  { label: "Leadership", href: "/team" },
  { label: "Contact", href: "/contact" },
]
