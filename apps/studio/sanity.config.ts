import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {customColorPicker} from 'sanity-plugin-color-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Crumb Studio',

  projectId: 'grc0mz56',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), customColorPicker()],

  schema: {
    types: schemaTypes,
  },
})
