import yandexMetrika from '../../src/module'

module.exports = {
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [yandexMetrika],
  yandexMetrika: {
    id: 'XXXXXX', // Specify your Yandex Metrika ID
    // Additional options
  }
}
