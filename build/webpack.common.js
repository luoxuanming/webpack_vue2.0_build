const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: path.join(srcPath, 'index'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              // 去除模板中的空格
              preserveWhitespace: false,
              // postcss配置,把vue文件中的样式部分,做后续处理
              postcss: {
                // plugins: [...], // 插件列表
                options: { parser: 'postcss-scss' }
              },
              loaders: {
                css: ['vue-style-loader', 'css-loader'],
                scss: ['vue-style-loader', 'css-loader', 'scss-loader'],
              }
            }
          }
        ],
      },

      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath,
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common']
    })
  ]
}

