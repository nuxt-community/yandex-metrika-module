import { defineNuxtConfig } from 'nuxt3'
import YandexMetrikaModule from '..'

export default defineNuxtConfig({
  modules: [
    YandexMetrikaModule
  ],
  yandexMetrika: {
    id: 'XXXXXX'
  }
})
