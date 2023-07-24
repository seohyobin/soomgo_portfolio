const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (WrapComponent) => {
  WrapComponent.use(
    "/JSP",
    createProxyMiddleware({
      "target":"http://rlaqjawh46.cafe24.com",
      changeOrigin: true
    })
  )
  WrapComponent.use(
    "/soomgo",
    createProxyMiddleware({
      "target":"http://rlaqjawh46.cafe24.com",
      changeOrigin: true
    })
  )
}