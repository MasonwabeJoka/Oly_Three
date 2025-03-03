import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
	projectId: '54qu3wpe',
	dataset: 'production',
	apiVersion: '2024-01-25', // Update to current date
	useCdn: true, // Change to true for production
	token: process.env.SANITY_SECRET_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)






