import { resolve } from 'path'
import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin, isNuxt2 } from '@nuxt/kit'
import defu from 'defu'

import logger from './logger'

export interface ModuleOptions {
	id?: string,
	dev?: boolean,
	metrikaUrl?: string,
	accurateTrackBounce?: boolean | number,
	childIframe?: boolean,
	clickmap?: boolean,
	defer?: boolean,
	ecommerce?: boolean | string | [],
	params?: object | [],
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
		name: '@nuxtjs/yandex-metrika',
		configKey: CONFIG_KEY
	},
	defaults: {
		metrikaUrl: 'https://mc.yandex.ru/metrika',
		accurateTrackBounce: true,
		childIframe: false,
		clickmap: true,
		defer: false,
		trackHash: false,
		trackLinks: true,
		type: 0,
		webvisor: false,
		triggerEvent: false
	},
	setup (options: ModuleOptions, nuxt) {
    // Don't include on dev mode
		if (options.dev && process.env.NODE_ENV !== 'production') {
			return
		}

		if (!options.id) {
			logger.error('No id provided.')
		}

		// Adds https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js
		options.metrikaUrl = (options.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : options.metrikaUrl) + '/tag.js'

		nuxt.options.publicRuntimeConfig[CONFIG_KEY] = defu(nuxt.options.publicRuntimeConfig[CONFIG_KEY], options)

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
		const plugin = isNuxt2() ? 'nuxt2.plugin' : 'plugin'

		// Register plugin
		addPlugin({
			src: resolve(runtimeDir, plugin),
			mode: 'client'
		})
	}
})
