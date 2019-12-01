module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/_settings.sass"`
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: 'http://localhost:3000',
  }
};
