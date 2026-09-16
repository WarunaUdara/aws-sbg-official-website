import * as React from 'react'
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
          'Official website of AWS Student Building Guild at the University of Sri Jayewardenepura. Fostering cloud architects, developer workshops, and student innovation.',
      },
      {
        name: 'theme-color',
        content: '#0b0f19',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☁️</text></svg>',
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
