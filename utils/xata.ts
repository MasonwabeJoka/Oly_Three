// This would allow you to wrap the generated client from xata/xata.ts with your own credentials
import { XataClient } from './xata.ts'
export const xata = new XataClient({ apiKey: process.env.XATA_API_KEY })