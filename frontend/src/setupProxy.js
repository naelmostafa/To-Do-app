const proxy = require('http-proxy-middleware');
   
// module.exports = function(app) {
//   app.use(
//     '/api',
//     proxy({
//       target: 'http://localhost:8000',
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:8000' }));
};