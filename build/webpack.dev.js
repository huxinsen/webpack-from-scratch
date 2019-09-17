const path = require('path')

module.exports = {
  mode: 'development',
  // 在开发环境下，使用 webpack-dev-server
  // 其在内存中打包，不会产生实体文件
  // 开启服务的配置
  devServer: {
    port: '3000',
    compress: true, // 使用 gzip 提升返回页面的速度
    contentBase: path.resolve(__dirname, '../dist'), // webpack 启动服务会在 dist 目录下
  },
}
