import { SITE_CONFIG } from './constants'

export interface SeoOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  imageType?: string
  type?: 'website' | 'article'
}

export function createSeoMeta(options: SeoOptions = {}) {
  const {
    title = `${SITE_CONFIG.name} | ${SITE_CONFIG.university}`,
    description = SITE_CONFIG.description,
    path = '',
    image = SITE_CONFIG.ogImage,
    imageWidth = SITE_CONFIG.ogImageWidth,
    imageHeight = SITE_CONFIG.ogImageHeight,
    imageAlt = SITE_CONFIG.ogImageAlt,
    imageType = SITE_CONFIG.ogImageType,
    type = 'website',
  } = options

  // Clean canonical URL
  const cleanPath = path.startsWith('/') ? path : path ? `/${path}` : ''
  const canonicalUrl = `${SITE_CONFIG.url}${cleanPath}`

  return {
    meta: [
      { charSet: 'utf-8' as const },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { name: 'theme-color', content: '#0D0D0D' },

      // Open Graph Protocol (Facebook, LinkedIn, Slack, Discord, WhatsApp)
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_CONFIG.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: imageType },
      { property: 'og:image:width', content: String(imageWidth) },
      { property: 'og:image:height', content: String(imageHeight) },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  }
}
