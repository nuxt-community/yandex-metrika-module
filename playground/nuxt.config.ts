import { defineNuxtConfig } from 'nuxt3'
import YandexMetrikaModule from '..'

export default defineNuxtConfig({
	dev: true,
	render: {
		resourceHints: false
	},
	modules: [
		YandexMetrikaModule
	],
	yandexMetrika: {
		id: 'XXXXXX'
	}
})
