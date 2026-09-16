import type { CommunityEvent } from './types'

export const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: 'aws-infrastructure-essentials',
    title: 'Inaugural Session: AWS Infrastructure Essentials',
    description: 'The official inaugural session of AWS Student Builder Group USJ. Dive deep into core AWS infrastructure fundamentals, VPC architecture, compute services, and real-world DevOps/SRE production best practices.',
    category: 'Workshop',
    status: 'upcoming',
    date: '2026-10-15',
    time: '06:00 PM - 07:30 PM IST',
    location: 'University of Sri Jayewardenepura / Hybrid',
    isVirtual: true,
    speakers: [
      {
        name: 'Shamika Shehan Kosgolle',
        role: 'Associate Architect DevOps & SRE',
        company: 'Kaya',
        linkedinUrl: 'https://www.linkedin.com/in/shamika-shehan-kosgolle-759440243/',
      },
    ],
    tags: ['Inaugural Session', 'AWS Infrastructure', 'DevOps & SRE', 'VPC & Compute', 'Kaya', 'USJ Builders'],
    capacity: 150,
    registrationUrl: 'https://www.meetup.com/aws-sbg-at-univ-of-sri-jayewardenepura-mattegoda-campus/',
  },
  {
    id: 'intro-to-aws-student-builder',
    title: 'Welcome to Cloud: Getting Started with AWS Free Tier & Student Credits',
    description: 'Foundational kickoff session introducing first-year and sophomore students to cloud computing and AWS Student Builder Group USJ.',
    category: 'Webinar',
    status: 'completed',
    date: '2026-08-20',
    time: '07:00 PM - 08:30 PM IST',
    location: 'Virtual (Google Meet / YouTube Live)',
    isVirtual: true,
    speakers: [
      {
        name: 'SBG USJ Core Team',
        role: 'Student Leads',
        company: 'USJ',
      }
    ],
    tags: ['Free Tier', 'Getting Started', 'Community', 'Student Program'],
    recordingUrl: 'https://youtube.com',
  },
  {
    id: 'aws-cloud-bootcamp-2026',
    title: 'AWS Certified Cloud Practitioner Bootcamp',
    description: 'An intensive, hands-on weekend bootcamp covering core AWS services, cloud economics, IAM security, and architectural best practices to prepare USJ students for CLF-C02 certification.',
    category: 'Bootcamp',
    status: 'completed',
    date: '2026-07-10',
    time: '09:00 AM - 04:00 PM IST',
    location: 'Faculty of Applied Sciences, USJ / Hybrid',
    isVirtual: true,
    speakers: [
      {
        name: 'Waruna Udara',
        role: 'Event & Logistics Lead',
        company: 'AWS SBG USJ',
      },
      {
        name: 'AWS Solutions Architect Guest',
        role: 'Senior Solutions Architect',
        company: 'AWS User Group Sri Lanka',
      }
    ],
    tags: ['Cloud Practitioner', 'Hands-on Lab', 'Certification Prep', 'IAM', 'EC2', 'S3'],
    capacity: 120,
    recordingUrl: 'https://youtube.com',
  },
  {
    id: 'serverless-cdk-mastery',
    title: 'Building Production Serverless Apps with AWS CDK & TypeScript',
    description: 'Learn Infrastructure as Code (IaC) by synthesizing real-world serverless microservices with AWS Lambda, API Gateway, and DynamoDB using AWS CDK.',
    category: 'Workshop',
    status: 'completed',
    date: '2026-06-24',
    time: '02:00 PM - 05:30 PM IST',
    location: 'Computing Center Lab 02, USJ',
    isVirtual: false,
    speakers: [
      {
        name: 'Eranga',
        role: 'Technical Lead',
        company: 'AWS SBG USJ',
      }
    ],
    tags: ['AWS CDK', 'TypeScript', 'Lambda', 'DynamoDB', 'IaC'],
    capacity: 60,
    recordingUrl: 'https://youtube.com',
  },
]
