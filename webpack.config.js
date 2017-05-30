const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          forceEnv: 'development'
        }
      },
      //Handle CSS modules for App
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true, //Disabled because fonts don't load using blob:http when sourceMap enabled.
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              minimize: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'remove-this-and-it-fails',
              sourceMap: true,
              plugins: function () {
                return [
                  autoprefixer()
                ]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  }
}
