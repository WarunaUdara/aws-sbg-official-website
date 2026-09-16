import { createServerFn } from '@tanstack/react-start'
import { handleContactSubmission, type ContactSubmission } from '../services/contact.server'

export const submitContactFn = createServerFn({ method: 'POST' })
  .validator((input: unknown) => {
    const data = input as ContactSubmission
    if (!data.name || !data.email || !data.message) {
      throw new Error('Name, email, and message are required')
    }
    return data
  })
  .handler(async ({ data }) => {
    return await handleContactSubmission(data)
  })
