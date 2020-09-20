const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api/**/*', {
      target: process.env.REACT_APP_DEV_ENDPOINT,
      secure: false,
      changeOrigin: true,
      https: true,
      xfwd: true,

      pathRewrite: path => {
        const vals = path.split('/api/');
        return vals[1];
      }
    })
  );
};
