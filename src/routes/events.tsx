import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Filter, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { MOCK_EVENTS } from '@/features/events/data'
import type { EventCategory } from '@/features/events/types'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

const CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Bootcamp',
  'Workshop',
  'Hackathon',
  'Certification',
  'Webinar',
]

function EventsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<'All' | EventCategory>('All')
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'past'>('upcoming')

  const events = MOCK_EVENTS

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' || event.category === selectedCategory
    const matchesTab =
      activeTab === 'upcoming'
        ? event.status === 'upcoming' || event.status === 'ongoing'
        : event.status === 'completed'
    return matchesCategory && matchesTab
  })

  return (
    <div className="py-12 md:py-20">
      <Container size="lg">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Community Learning & Programs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Events, Bootcamps & <span className="aws-gradient-text">Workshops</span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            Hands-on workshops, cloud certification prep cohorts, and hackathons organized by AWS Student Builder Group USJ.
          </p>
        </div>

        {/* Tab Selection: Upcoming vs Past */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-none border border-slate-800 self-start">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-none text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#FF9900] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-none text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'past'
                  ? 'bg-[#FF9900] text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Past Recordings
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block mr-1" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-none text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-200 text-slate-950 font-bold'
                    : 'bg-[#161F2E] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#161F2E]/40 rounded-none border border-white/10 p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-[#FF9900] mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-white">No sessions found in this category</h3>
            <p className="text-base text-slate-300 max-w-sm mx-auto">
              Check back soon or suggest a topic to our lead organizers in our WhatsApp community!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory('All')}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}
