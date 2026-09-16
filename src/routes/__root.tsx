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
import '@/styles/globals.css'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'AWS Student Builder Group USJ | University of Sri Jayewardenepura',
      },
      {
        name: 'description',
        content:
          'Build real cloud systems at USJ. Learn AWS, explore GenAI with Amazon Bedrock, and launch production projects with student developers.',
      },
      {
        name: 'theme-color',
        content: '#0b0f19',
      },
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
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Space+Grotesk:wght@400..700&display=swap',
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
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col font-sans selection:bg-[#FF9900]/30 selection:text-[#FF9900]">
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
