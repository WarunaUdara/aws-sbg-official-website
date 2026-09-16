export interface ProjectContributor {
  name: string
  role: string
  github?: string
  avatarUrl?: string
}

export interface BuilderProject {
  id: string
  title: string
  description: string
  category: 'AI/ML' | 'Serverless' | 'IoT' | 'DevOps' | 'Web Apps'
  awsServices: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  contributors: ProjectContributor[]
  stars?: number
}
