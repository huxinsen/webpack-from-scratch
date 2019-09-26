// webpack 默认支持node规范（CommonJS），同时支持 es6 规范（ESModule）
// 打包本模块，解析出浏览器可以识别的代码
// npx：npm 5.2后支持，可以用来调用项目内部安装的模块，如：npx webpack

import React from 'react'
import ReactDOM from 'react-dom'
// ts 校验类型
interface IProps {
  num: number
}
let initState = { count: 0 }
type State = Readonly<typeof initState>

class Counter extends React.Component<IProps, State> {
  state: State = initState
  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter num={1} />, document.getElementById('root'))

// 使用 ts 的方案：
// 1）ts-loader 配合 typescript 库
// 生成ts的配置文件：npx tsc --init
// 配置ts-loader：
// {
//   test:/\.tsx?$/,
//   use: ['ts-loader'],
//   exclude: /node_modules/
// }
// 2）babel7 @babel/preset-typescript（转换库）
