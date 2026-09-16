export interface ContactSubmission {
  name: string
  email: string
  studentId?: string
  faculty: string
  interest: string
  message: string
}

export async function handleContactSubmission(data: ContactSubmission) {
  // In future: Persist to database & dispatch email notification via AWS SES
  console.log('[SERVER LOG] New Student Membership / Inquiry:', {
    timestamp: new Date().toISOString(),
    ...data,
  })

  return {
    success: true,
    message: 'Thank you for reaching out! The AWS SBG USJ team will get back to you soon.',
    receivedAt: new Date().toISOString(),
  }
}
