const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/news',
    createProxyMiddleware({
      target: 'https://newsapi.org',  // Target API URL
      changeOrigin: true,
      pathRewrite: {
        '^/api/news': '/v2/everything',  // Rewriting '/api/news' to '/v2/everything'
      },
      onProxyReq: (proxyReq) => {
        // Add the API key in the request header to keep it hidden from the client
        proxyReq.setHeader('X-Api-Key', 'ed4d1481627c4618ab7de7116a9bf786');
      }
    })
  );
};
