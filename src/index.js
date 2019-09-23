// webpack 默认支持node规范（CommonJS），同时支持 es6 规范（ESModule）
// 打包本模块，解析出浏览器可以识别的代码
// npx：npm 5.2后支持，可以用来调用项目内部安装的模块，如：npx webpack

// 实现 es6 => es5
import './a'

const fn = () => {}
fn()

@log
class A {
  a = 1
}

function log(target) {
  console.log(target)
}

;[1, 2, 3].includes(1) // 不能转换高级语法（实例上的语法），promise 也不能转化
