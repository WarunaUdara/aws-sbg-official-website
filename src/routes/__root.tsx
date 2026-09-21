import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { ReactLenis } from 'lenis/react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { createSeoMeta } from '@/lib/seo'
import '@/styles/globals.css'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => {
    const seo = createSeoMeta()
    return {
      meta: [
        ...seo.meta,
      ],
      links: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          crossOrigin: 'anonymous',
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Noto+Serif+Sinhala:wght@100..900&family=Oxanium:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/sbg-icon-only.png',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/sbg-icon-only.png',
        },
      ],
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className="min-h-screen bg-[#0D0D0D] text-slate-100 flex flex-col font-sans selection:bg-[#FF9900]/30 selection:text-[#FF9900]"
        suppressHydrationWarning
      >
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </ReactLenis>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
