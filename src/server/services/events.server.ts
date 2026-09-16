import { MOCK_EVENTS } from '@/features/events/data'
import type { CommunityEvent, EventCategory } from '@/features/events/types'

export async function fetchEvents(category?: EventCategory): Promise<CommunityEvent[]> {
  // In future: Query database (e.g. DynamoDB or PostgreSQL via Drizzle)
  if (category) {
    return MOCK_EVENTS.filter((e) => e.category === category)
  }
  return MOCK_EVENTS
}

export async function fetchEventById(id: string): Promise<CommunityEvent | undefined> {
  return MOCK_EVENTS.find((e) => e.id === id)
}
