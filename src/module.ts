import defu from 'defu'
import { ModuleOptions, moduleDefaults } from './options'
const path = require('path')

// https://github.com/RabotaRu/yandex-metrika

function yandexMetrikaModule (moduleOptions) {
  const { nuxt, addPlugin } = this

  // Don't include on dev mode
  if (nuxt.options.dev && process.env.NODE_ENV !== 'production') {
    return
  }

  // Runtime config
  const useRuntimeConfig = nuxt.options.publicRuntimeConfig ? 'yandexMetrika' : undefined

  // Merge all option sources
  const options: ModuleOptions = defu(
    moduleOptions,
    nuxt.options.yandexMetrika,
    useRuntimeConfig,
    moduleDefaults
  )

  // Use the yandex metrika CDN or url
  const metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') + '/tag.js'

  options.metrikaUrl = metrikaUrl

  // Add script preload in head section
  if (!options.disablePreload) {
    nuxt.options.head.link.push({
      href: metrikaUrl,
      rel: 'preload',
      as: 'script',
      crossorigin: 'use-credentials'
    })
  }

  // Register plugin
  addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    options
  })
}

yandexMetrikaModule.meta = require('../package.json')

export default yandexMetrikaModule