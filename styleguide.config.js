module.exports = {
  skipComponentsWithoutExample: true,
  components: 'src/**/*.js',
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.devtool = 'cheap-module-source-map'
    return webpackConfig
  }
}
