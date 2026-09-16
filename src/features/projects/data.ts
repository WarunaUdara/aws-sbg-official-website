import type { BuilderProject } from './types'

export const MOCK_PROJECTS: BuilderProject[] = [
  {
    id: 'usj-campus-ai-navigator',
    title: 'USJ Campus AI Smart Navigator',
    description: 'A conversational campus assistant built with Amazon Bedrock, Lambda, and OpenSearch to assist students with course queries, faculty offices, and academic calendars.',
    category: 'AI/ML',
    awsServices: ['Amazon Bedrock', 'AWS Lambda', 'Amazon OpenSearch', 'Amazon S3'],
    githubUrl: 'https://github.com/WarunaUdara/aws-sbg-official-website',
    demoUrl: 'https://campus.sbg-usj.org',
    featured: true,
    contributors: [
      { name: 'Waruna Udara', role: 'Full Stack & Cloud Lead' },
      { name: 'Kavindu Perera', role: 'Prompt Engineering' },
    ],
    stars: 48,
  },
  {
    id: 'smart-iot-weather-usj',
    title: 'USJ Micro-Climate IoT Station',
    description: 'Real-time environmental sensor network across university botanical grounds streaming telemetry to AWS IoT Core and visualized via DynamoDB & QuickSight.',
    category: 'IoT',
    awsServices: ['AWS IoT Core', 'Amazon DynamoDB', 'AWS Lambda', 'Amazon QuickSight'],
    githubUrl: 'https://github.com/WarunaUdara/aws-sbg-official-website',
    featured: true,
    contributors: [
      { name: 'Tharindu Fernando', role: 'Hardware & IoT' },
      { name: 'Sanduni Silva', role: 'Data Analytics' },
    ],
    stars: 32,
  },
  {
    id: 'serverless-event-ticketing',
    title: 'SBG EventPass: Zero-Cost Serverless QR Verification',
    description: 'An open-source, resilient student event pass system generating cryptographic QR tickets and instant offline-compatible verification using AWS Step Functions.',
    category: 'Serverless',
    awsServices: ['AWS Step Functions', 'Amazon API Gateway', 'AWS Lambda', 'Amazon SES'],
    githubUrl: 'https://github.com/WarunaUdara/aws-sbg-official-website',
    demoUrl: 'https://pass.sbg-usj.org',
    featured: true,
    contributors: [
      { name: 'Nisal Weerasinghe', role: 'Serverless Architecture' },
    ],
    stars: 64,
  },
]
