const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    proxy: {
      '/tencent':{
        target: 'https://view.inews.qq.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/tencent': ''
        }
      }
    }
  }
};