import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to ensure real-time data updates for write operations
  token
})

if (!writeClient.config().token) {
  throw new Error(
    'Write token missing.'
  )
}
