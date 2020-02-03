// react 的cli 只能在package.json里配置proxy为string，不能为object

const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    })
  );
};