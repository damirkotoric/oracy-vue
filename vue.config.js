module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/sass/_settings.sass"`
      }
    }
  },
  devServer: {
    proxy: 'https://librivox.org/'
  }
};
