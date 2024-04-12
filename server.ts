// An express server to self host (eliminating the need for Versel)
import express from 'express'
import { getPayloadClient } from './getPayload'
import { nextApp, nextHandler } from './utils/next-utils'

const app = express()

const PORT = Number(process.env.PORT) || 3000

const start  = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
      }
    }
  })
// forward each request and response from express to NextJS
  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(()=> {
    payload.logger.info('Next.js started')

    app.listen(PORT, async ()=> {
        payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  })
}

start()