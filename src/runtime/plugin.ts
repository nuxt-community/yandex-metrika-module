import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useRouter } from "#imports";

export default defineNuxtPlugin(async ({ vueApp }) => {
  const { id, metrikaUrl, ...metrikaOptions } = useRuntimeConfig().yandexMetrika

	let ready = false
	const basePath = (useRouter().options.history.base || '/').replace(/\/$/, '')

	useRouter().isReady().then(() => {
		// Mark when the router has completed the initial navigation.
		ready = true
	})

	function create() {
		if (!ready) {
			// Don't record a duplicate hit for the initial navigation.
			(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
				m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			(window, document, 'script', metrikaUrl, 'ym')

			ym(id, 'init', metrikaOptions)
		}

		useRouter().afterEach((to, from) => {
			ym(id, 'hit', basePath + to.fullPath, {
				referer: basePath + from.fullPath,
        title: to.meta.title
			})
		})
	}

	if (window.ym === undefined) {
		create()
	}
})
