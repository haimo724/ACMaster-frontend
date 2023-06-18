const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: './',
  // assetsDir: './src/assets',
  // parallel: false
  devServer: {
    // env: require('./dev.env'),
    port: 9090  // 端口号
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    // proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // cssSourceMap: false,
   }
})
