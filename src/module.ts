import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import { defineNuxtModule, addPlugin, addTemplate, isNuxt2, useLogger } from '@nuxt/kit'
import defu from 'defu'

export interface ModuleOptions {
  id?: string,
  metrikaUrl?: string,
  accurateTrackBounce?: boolean | number,
  childIframe?: boolean,
  clickmap?: boolean,
  defer?: boolean,
  ecommerce?: boolean | string | [],
  params?: object | [],
  useRuntimeConfig?: boolean,
  useCDN?: boolean,
  userParams?: object,
  trackHash?: boolean,
  trackLinks?: boolean,
  trustedDomains?: [],
  type?: number,
  webvisor?: boolean,
  triggerEvent?: boolean,
}

const logger = useLogger('nuxt:yandex-metrika')
const CONFIG_KEY = 'yandexMetrika'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/yandex-metrika',
    configKey: CONFIG_KEY,
    compatibility: {
      bridge: true
    }
  },
  defaults: {
    id: process.env.YANDEX_METRIKA_ID,
    metrikaUrl: 'https://mc.yandex.ru/metrika',
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    useRuntimeConfig: true,
    trackHash: false,
    trackLinks: true,
    type: 0,
    webvisor: false,
    triggerEvent: false
  },
  setup (options: ModuleOptions, nuxt) {
    // Don't include on dev mode
    if (nuxt.options.dev && process.env.NODE_ENV !== 'production') {
      logger.info('Module not enabled because you are in dev mode.')
      return
    }

    if (!options.id) {
      logger.error('No id provided.')
    }

    // Adds https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js
    options.metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : options.metrikaUrl) + '/tag.js'

    if (options.useRuntimeConfig) {
      nuxt.options.runtimeConfig.public[CONFIG_KEY] = defu(nuxt.options.runtimeConfig.public[CONFIG_KEY], options)
    }

    addTemplate({
      filename: 'yandex-metrika.options.mjs',
      getContents: () => {
        return `export default () => Promise.resolve(${JSON.stringify(
          options.useRuntimeConfig ? nuxt.options.runtimeConfig.public[CONFIG_KEY] : options || {}
        )})`
      }
    })

    const getMeta = () => {
      if (isNuxt2()) {
        nuxt.options.head = nuxt.options.head || {}
        nuxt.options.head.link = nuxt.options.head.link || []
      } else {
        nuxt.options.app.head.link = nuxt.options.app.head.link || []
      }

      return isNuxt2() ? nuxt.options.head : nuxt.options.app.head
    }

    // Script preload
    getMeta().link.push({
      href: options.metrikaUrl,
      rel: 'preload',
      as: 'script'
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    // Register plugin
    addPlugin({
      src: resolve(runtimeDir, 'plugin'),
      mode: 'client'
    })
  }
})
