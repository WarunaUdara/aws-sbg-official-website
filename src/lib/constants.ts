export const SITE_CONFIG = {
  name: "AWS Student Building Guild - USJ",
  shortName: "AWS SBG USJ",
  university: "University of Sri Jayewardenepura",
  tagline: "Empowering Sri Lankan Student Builders with AWS Cloud & Modern Tech",
  description: "The official hub for student cloud architects, developers, and innovators at the University of Sri Jayewardenepura. Build, learn, and innovate with AWS.",
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
 * To use a local video: place your MP4/WebM in the /public folder (e.g. "/hero-bg.mp4")
 * and set videoUrl: "/hero-bg.mp4".
 */
export const HERO_CONFIG = {
  // === BACKGROUND VIDEO URL ===
  // Served from public/hero/
  videoUrl: "/hero/hero-bg.mp4",
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
  headline: "The Student Platform\nfor Modern Cloud Builders",
  description:
    "AWS SBG USJ unifies student developers and cloud architects at the University of Sri Jayewardenepura. Deploy serverless systems, innovate with GenAI, and launch your engineering career in one place.",

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
  { label: "Workshops", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Core Team", href: "/team" },
  { label: "Design System", href: "/design-system" },
]
