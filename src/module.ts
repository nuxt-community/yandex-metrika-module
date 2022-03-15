import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addTemplate, isNuxt2 } from '@nuxt/kit'
import defu from 'defu'

import { name, version } from '../package.json'

import logger from './logger'

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

const CONFIG_KEY = 'yandexMetrika'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    [CONFIG_KEY]?: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: CONFIG_KEY,
    compatibility: {
      bridge: true
    }
  },
  defaults: {
    metrikaUrl: 'https://mc.yandex.ru/metrika',
    accurateTrackBounce: true,
    childIframe: false,
    clickmap: true,
    defer: false,
    useRuntimeConfig: false,
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
      nuxt.options.publicRuntimeConfig[CONFIG_KEY] = defu(nuxt.options.publicRuntimeConfig[CONFIG_KEY], options)
    }

    addTemplate({
      filename: 'yandex-metrika.options.mjs',
      getContents: () => {
        return `export default () => Promise.resolve(${JSON.stringify(
          options.useRuntimeConfig ? nuxt.options.publicRuntimeConfig[CONFIG_KEY] : options || {}
        )})`
      }
    })

    const getMeta = () => {
      return isNuxt2() ? nuxt.options.head : nuxt.options.meta || []
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
