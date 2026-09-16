import type { TeamMember } from './types'

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'waruna-udara',
    name: 'Waruna Udara',
    role: 'Lead Community Organizer',
    faculty: 'Faculty of Applied Sciences / Computing',
    bio: 'Passionate student cloud builder and community enthusiast advocating for modern cloud development and peer mentorship at USJ.',
    certifications: ['AWS Certified Solutions Architect', 'AWS Certified Cloud Practitioner'],
    github: 'https://github.com/WarunaUdara',
    linkedin: 'https://linkedin.com/in/warunaudara',
  },
  {
    id: 'cloud-tech-lead',
    name: 'Technical Architecture Lead',
    role: 'Technical & Workshops Lead',
    faculty: 'Faculty of Technology',
    bio: 'Specializing in DevOps automation, AWS CDK, and Kubernetes architecture. Guides students through hands-on builder labs.',
    certifications: ['AWS Certified Developer Associate'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'community-lead',
    name: 'Student Outreach & Engagement',
    role: 'Community Lead',
    faculty: 'Faculty of Applied Sciences',
    bio: 'Coordinates campus meetups, student outreach, hackathons, and partnerships with external tech communities across Sri Lanka.',
    certifications: ['AWS Cloud Quest Builder'],
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'faculty-mentor',
    name: 'Faculty Advisor',
    role: 'Academic & Staff Advisor',
    faculty: 'University of Sri Jayewardenepura',
    bio: 'Senior academic mentoring the student guild in bridging university curricula with global industry standards in cloud engineering.',
  },
]
