// webpack 默认支持node规范（CommonJS），同时支持 es6 规范（ESModule）
// 打包本模块，解析出浏览器可以识别的代码
// npx：npm 5.2后支持，可以用来调用项目内部安装的模块，如：npx webpack

import Vue from 'vue'
import App from './App.vue'

let vm = new Vue({
  el: '#root',
  render: h => h(App),
})
