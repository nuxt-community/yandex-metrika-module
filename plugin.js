import qs from 'qs'
export default ({ app: { router }, $config }) => {

  const { useRuntimeConfig, metrikaUrl, ...options } = <%= serialize(options) %>
  if ($config && useRuntimeConfig) {
    Object.assign(options, $config[useRuntimeConfig])
  }
  const { id, ...metrikaOptions } = options

  let ready = false
  const basePath = (router.options.base || '/').replace(/\/$/, '')

  router.onReady(() => {
    // Mark when the router has completed the initial navigation.
    ready = true
  })

  function getPathWithoutQueryByFilter (route, filter) {
    if (!Array.isArray(filter)) return
    if (!filter.length) return

    const { query } = route
    let path

    filter.forEach(v => delete query[v])
    
    path = new URLSearchParams(query).toString().length
      ? `/?${new URLSearchParams(query).toString()}`
      : '/'

    return path
  }

  function create() {

    if (!ready) {
      // Don't record a duplicate hit for the initial navigation.
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", metrikaUrl, "ym")

      ym(id, "init", metrikaOptions)
    }
    router.afterEach((to, from) => {
    const toFullPathWithoutQuery = getPathWithoutQueryByFilter(to, metrikaOptions.queryFiler)
    const fromFullPathWithoutQuery = getPathWithoutQueryByFilter(from, metrikaOptions.queryFiler)
  
      ym(id, 'hit', basePath + toFullPathWithoutQuery ? toFullPathWithoutQuery : to.fullPath, {
        referer: basePath + fromFullPathWithoutQuery ? fromFullPathWithoutQuery : from.fullPath
        // TODO: pass title: <new page title>
        // This will need special handling because router.afterEach is called *before* DOM is updated.
      })
    })
  }

  if (window.ym === undefined) {
    create()
  }

}
