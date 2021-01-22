export interface ModuleOptions {
  id: string
  useRuntimeConfig: string
  useCDN: boolean
  metrikaUrl?: string
  accurateTrackBounce: boolean|number
  childIframe: boolean
  clickmap: boolean
  defer: boolean
  ecommerce: boolean|string|Array<any>
  params: Object|Array<any>
  userParams: Object
  trackHash: boolean
  trackLinks: boolean
  trustedDomains: Array<any>
  type: number
  ut: string
  webvisor: boolean
  triggerEvent: boolean
}

export const moduleDefaults: ModuleOptions = {
  id: 'XXXXXX',
  useRuntimeConfig: 'yandexMetrika',
  useCDN: false,
  accurateTrackBounce: false,
  childIframe: false,
  clickmap: false,
  defer: false,
  ecommerce: false,
  params: false,
  userParams: false,
  trackHash: false,
  trackLinks: false,
  trustedDomains: [],
  type: 0,
  ut: '',
  webvisor: false,
  triggerEvent: false
}
