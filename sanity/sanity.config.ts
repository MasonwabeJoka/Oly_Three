import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemas} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {unsplashImageAsset} from "sanity-plugin-asset-source-unsplash"

const devOnlyPlugins = [getStartedPlugin()]

const config = defineConfig({
  name: 'default',
  title: 'oly',
  projectId: '54qu3wpe',
  dataset: 'production',
  apiVersion: '2024-01-25',
  basePath: '/admin',


  plugins: [deskTool(), visionTool(), unsplashImageAsset(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemas,
  },
})

export default config
