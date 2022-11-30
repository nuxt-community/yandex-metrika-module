import YandexMetrikaModule from '..'

export default defineNuxtConfig({
  modules: [
    YandexMetrikaModule
  ],
  yandexMetrika: {
    id: 'XXXXXX',
    useRuntimeConfig: true
  }
})
