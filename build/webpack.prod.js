const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前清空目录

module.exports = {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
}
