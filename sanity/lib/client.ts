import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for write operations
  token: process.env.SANITY_AUTH_TOKEN, // Add your Sanity auth token here
})
