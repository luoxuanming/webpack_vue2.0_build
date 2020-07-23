const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackCommonConf = require('./webpack.common.js')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    filename: 'bundle.[contentHash:8].js',
    path: distPath,
  },
  module: {
    rules: [


      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              name: '[name].[ext]',
              outputPath: '/img/',

              // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
              // publicPath: 'http://cdn.abc.com'
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      }
    ]

  },
  plugins: [
    //配置全局变量
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production')
    }),

    // 会默认清空 dist 文件夹
    new CleanWebpackPlugin(),

    //抽离css
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css',
    }),
  ],

  optimization: {
    //压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

})