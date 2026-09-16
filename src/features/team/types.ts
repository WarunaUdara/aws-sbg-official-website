export interface TeamMember {
  id: string
  name: string
  role: string
  faculty: string
  bio: string
  certifications?: string[]
  avatarUrl?: string
  github?: string
  linkedin?: string
  twitter?: string
}
