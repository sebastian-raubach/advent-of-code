module.exports = {
  lintOnSave: true,
  runtimeCompiler: true,
  transpileDependencies: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.txt$/i,
          use: 'raw-loader',
        },
        {
          test: /\.md$/i,
          use: 'raw-loader',
        }
      ]
    },
    resolve: {
      // ... rest of the resolve config
      fallback: {
        'path': require.resolve('path-browserify')
      }
    },
    devtool: 'source-map',
    target: 'web'
  }
}