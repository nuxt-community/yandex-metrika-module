# Yandex Metrika
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Add Yandex Metrika to your Nuxt application.

This plugin automatically sends first page and route change events to Yandex Metrika.

**Note:** Yandex Metrika is not enabled in dev mode.
You can set environment variable `NODE_ENV` to `production` for testing in dev mode.

## Setup

- Add `@nuxtjs/yandex-metrika` dependency to your project
- Add `@nuxtjs/yandex-metrika` to `modules` section of `nuxt.config.js`

```js
{
  modules: ['@nuxtjs/yandex-metrika']
}
```

## Configure

You can pass options directly in module declaration:

```ts
{
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: 'XXXXXX',
        webvisor: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ]
  ]
}
```

Or you can specify `yandexMetrika` key:

```ts
{
  modules: ['@nuxtjs/yandex-metrika'],
  yandexMetrika: {
    id: 'XXXXXX',
    // ...
  }
}
```

In Nuxt 2.13+, you can also use public runtime config:

```js
{
  modules: ['@nuxtjs/yandex-metrika'],
  publicRuntimeConfig: {
    yandexMetrika: {
      id: process.env.YANDEX_METRIKA_ID,
      // ...
    }
  }
}
```

## Options

For more information:
- [Documentation for Ya.Metrika](https://yandex.com/support/metrica/code/counter-initialize.html)
- [hit method](https://yandex.com/support/metrica/objects/hit.html)

| Name                | Default value | Type    | Description                                                                                                                                      |
|---------------------|---------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| accurateTrackBounce | true          | Boolean | Number                                                                                                                                           |Accurate bounce rate The parameter can accept these values:  true — Enable the accurate bounce rate, with a non-bounce event registered after 15000 ms (15 s). false — Don't enable the accurate bounce rate. <N> (integer) — Enable the accurate bounce rate. Non-bounce events are recorded after <N> ms.|
| childIframe         | false         | Boolean | Whether to record iframe contents without a tag in a child window                                                                                |
| clickmap            | true          | Boolean | Whether to collect data for a click map                                                                                                          |
| defer               | false         | Boolean | Whether to disable automatically sending data during tag initialization                                                                          |
| ecommerce           | false         | Boolean | String                                                                                                                                           | Array|Collect data for e-commerce — Ecommerce.  true — Enable e-commerce data collection. Data is transmitted via a JavaScript array named dataLayer in the global namespace (window.dataLayer) false — Disable Ecommerce data collection. <objectName> (String) — Enable Ecommerce data collection. Data is transmitted via a JavaScript array named <objectName> in the global namespace (window.<objectName>) <array> (Array) — Enable Ecommerce data collection. Data is transmitted via a JavaScript <array>|
| params              | —             | Object  | Array                                                                                                                                            |Session parameters transmitted during tag initialization To transmit session parameters at any other time, use the params method|
| userParams          | —             | Object  | Parameters of site users that are transmitted when initializing the tag To transmit user parameters at any other time, use the userParams method |
| trackHash           | false         | Boolean | Hash tracking in the browser's address bar                                                                                                       |
| trackLinks          | true          | Boolean | Track clicks on outbound links                                                                                                                   |
| trustedDomains      | —             | Array   | Indicates a trusted domain for recording the contents of a child iframe. Contains the domain address of the parent window                        |
| type                | 0             | Number  | Tag type. 1 for YAN                                                                                                                              |
| webvisor            | false         | Boolean | Whether to use Session Replay                                                                                                                    |
| triggerEvent        | false         | Boolean | Whether to check if the tag is ready                                                                                                             |

## Development

- Clone this repository
- Install dependencies using `pnpm install`
- Run `pnpm dev:prepare` to generate type stubs.
- Use `pnpm dev` to start [playground](./playground) in development mode.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/yandex-metrika/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/yandex-metrika

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/yandex-metrika.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/yandex-metrika

[license-src]: https://img.shields.io/npm/l/@nuxtjs/yandex-metrika.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/yandex-metrika
