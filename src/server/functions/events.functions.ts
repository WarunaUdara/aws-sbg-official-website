import { createServerFn } from '@tanstack/react-start'
import { fetchEvents, fetchEventById } from '../services/events.server'
import type { EventCategory } from '@/features/events/types'

export const getEventsFn = createServerFn()
  .validator((category?: string) => category as EventCategory | undefined)
  .handler(async ({ data }) => {
    return await fetchEvents(data)
  })

export const getEventByIdFn = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    const event = await fetchEventById(data)
    if (!event) {
      throw new Error(`Event with id "${data}" not found`)
    }
    return event
  })
