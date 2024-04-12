import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
	projectId: '54qu3wpe',
	dataset: 'production',
	apiVersion: '2021-10-21', // today's date.
	useCdn:false, // Todo: set to true before deployment
	token: process.env.SANITY_SECRETE_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)






