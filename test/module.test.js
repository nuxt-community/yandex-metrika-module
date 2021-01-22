import { setupTest, expectModuleNotToBeCalledWith, expectModuleToBeCalledWith } from '@nuxt/test-utils'

describe('dev configuration', () => {
  setupTest({
    config: {
      dev: true
    }
  })

  test('plugin should not be include', () => {
    expectModuleNotToBeCalledWith('addPlugin')
  })
})

describe('default configuration', () => {
  setupTest({
    config: {
      publicRuntimeConfig: null,
      yandexMetrika: {
        id: '123456'
      }
    }
  })

  test('should inject plugin', () => {
    expectModuleToBeCalledWith('addPlugin', expect.objectContaining({
      fileName: 'yandex-metrika.js'
    }))
  })
})

describe('runtime configuration', () => {
  setupTest({
    config: {
      publicRuntimeConfig: {
        yandexMetrika: {
          id: '123456'
        }
      }
    }
  })
})

describe('use cdn configuration', () => {
  setupTest({
    config: {
      yandexMetrika: {
        id: '123456',
        useCDN: true
      }
    }
  })
})
