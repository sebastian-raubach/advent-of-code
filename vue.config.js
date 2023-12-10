const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
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
    }
  }
})
