export type EventCategory = 'Bootcamp' | 'Workshop' | 'Hackathon' | 'Certification' | 'Webinar'

export type EventStatus = 'upcoming' | 'ongoing' | 'completed'

export interface Speaker {
  name: string
  role: string
  company: string
  avatarUrl?: string
}

export interface CommunityEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  status: EventStatus
  date: string
  time: string
  location: string
  isVirtual: boolean
  speakers: Speaker[]
  tags: string[]
  registrationUrl?: string
  capacity?: number
  recordingUrl?: string
}
