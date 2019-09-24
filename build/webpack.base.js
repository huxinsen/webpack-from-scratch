const dev = require('./webpack.dev')
const prod = require('./webpack.prod')

const path = require('path')
const merge = require('webpack-merge') // 合并配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动生成 html 文件并且引入打包后的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 把 css 提取到单独的文件，可以和 js 一同加载

// 通过 --config 指定执行的配置文件，两种方案：
// 1) 默认引用 base，再传入模式
// 2) 分别引入 dev 和 prod，在特定地方引入 base

module.exports = env => {
  let isDev = env.development

  const base = {
    // __dirname：当前文件根目录
    entry: path.resolve(__dirname, '../src/index.js'),
    module: {
      // 定义文件使用的 loader
      // loader 的执行顺序：默认从下往上，从右往左执行
      rules: [
        // 解析 js 文件，默认会调用 @babel/core，后者再调用 @babel/preset-env，把 es6 转化成 es5
        // .babelrc 配置文件：presets 调用顺序从下往上，plugins 从上往下
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        // 匹配 .css：css-loader, style-loader
        {
          test: /\.css/,
          // css-loader 解析css语法，将解析结果传递给 style-loader
          // style-loader 将解析的 css 变成 style 标签插入到页面中
          use: [
            // 开发环境使用 style-loader
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              // 给 loader 传递参数
              options: {
                // 如果 css 文件引入其他文件 @import
                importLoaders: 2,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        // 匹配 .scss：node-sass, sass-loader
        {
          test: /\.scss/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        // 其他预处理器
        // .less：less, less-loader
        // .stylus：stylus, stylus-loader

        // 图标的处理，file-loader 默认功能为拷贝
        {
          test: /\.(woff|ttf|eot)$/,
          use: 'file-loader',
        },
        // 图片的处理，url-loader 可以转成 base64 （减少 http 请求）
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: {
            loader: 'url-loader',
            options: {
              // 大于100k的图片，会调用 file-loader
              limit: 100 * 1024,
              name: 'images/[contenthash].[ext]',
            },
          },
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
      // 生产环境使用 mini-css-extract-plugin
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'styles/index.css',
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        minify: !isDev && {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
        },
      }),
    ].filter(Boolean),
  }
  // 函数要求返回配置文件，未返回就采用默认配置
  if (isDev) {
    return merge(base, dev)
  } else {
    return merge(base, prod)
  }
}
