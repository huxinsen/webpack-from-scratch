const dev = require('./webpack.dev')
const prod = require('./webpack.prod')

const path = require('path')
const merge = require('webpack-merge') // 合并配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 文件并且引入打包后的文件

// 通过 --config 指定执行的配置文件，两种方案：
// 1) 默认引用 base，再传入模式
// 2) 分别引入 dev 和 prod，在特定地方引入 base

module.exports = env => {
  let isDev = env.development

  const base = {
    // __dirname：当前文件根目录
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        minify: !isDev && {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
        },
      }),
    ],
  }
  // 函数要求返回配置文件，未返回就采用默认配置
  if (isDev) {
    return merge(base, dev)
  } else {
    return merge(base, prod)
  }
}
