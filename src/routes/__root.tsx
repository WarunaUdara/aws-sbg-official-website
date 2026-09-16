import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
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
        title: 'AWS SBG USJ | Official Student Building Guild - University of Sri Jayewardenepura',
      },
      {
        name: 'description',
        content:
          'Learn AWS by building real systems. Explore generative AI with Amazon Bedrock, architect serverless cloud infrastructure, and launch production grade projects with the student developer community at University of Sri Jayewardenepura.',
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
        crossOrigin: 'anonymous',
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-[#FF9900]/30 selection:text-[#FF9900]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
