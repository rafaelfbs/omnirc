const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware(router) {
  router.use(
    '/api',
    proxy({
      target:
        'https://venda2-st-digitais.f931749c223a4dcbbead.centralus.aksapp.io/',
      changeOrigin: true
    })
  )
}
