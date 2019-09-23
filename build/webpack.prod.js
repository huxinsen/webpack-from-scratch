const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css 文件
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩 js 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前清空目录

module.exports = {
  mode: 'production',
  // 优化项
  optimization: {
    // 压缩方案
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
}
