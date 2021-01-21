export interface ModuleOptions {
  id: string
  useRuntimeConfig: string
  useCDN: boolean
  metrikaUrl?: string
  accurateTrackBounce: boolean
  childIframe: boolean
  clickmap: boolean
  defer: boolean
  ecommerce: boolean
  params: boolean
  userParams: boolean
  trackHash: boolean
  trackLinks: boolean
  trustedDomains: boolean
  type: boolean
  ut: boolean
  webvisor: boolean
  disablePreload: boolean
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
  trustedDomains: false,
  type: false,
  ut: false,
  webvisor: false,
  triggerEvent: false,
  disablePreload: false
}
