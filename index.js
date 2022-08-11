/**
 * 思路：
 * 1：一个 .vue文件一个组件
 * 2：每个 .vue 文件都有 name 属性：作用 组件名称，统一 <ct-xxx />
 * 3: 在install 中遍历组件数组，使用Vue.component注册组件。
 * 发布：
 * 1：使用npm 发布
 * 2：从npm 上安装
 * 3：在main.js导入
 * 4: 将来使用 时候 通过vue.use 注册插件方式，使用自定义组件库
 * 5：使用组件 <ct-xxx />
 * 
 * 如何写好独立组件，思考方式：
 * 1：哪些是变量？哪些是事件？
 * 1：通过提供prop 属性，用户传入变量，组件可以是特定效果
 * 2：通过this.$emit 等完成交互功能，并提供事件
 * 
 * 问题：
 * 你在使用别人组件库的时候，都文档哪些内容？
 * 1：看写法，都每个属性的作用是什么，
 * 2：都组件提供了哪些事件，每个事件什么功能
 * */

import { Button } from './button'
import { topNavigator } from './menu'
import { Table, Tables } from './table'
import { pagination } from './pagination'
import {
  input,
  select,
  checkbox,
  radio,
  datetimePicker,
  switchs,
  radioCascader,
  forms
} from './form'
import { row, col } from './layout'
import { tree } from './tree'
import { Report } from './report'
const components = [
  Button, // ./button/src/button.vue 组件实例对象
  topNavigator,
  Table,
  Tables,
  pagination,
  input,
  select,
  checkbox,
  radio,
  switchs,
  radioCascader,
  datetimePicker,
  forms,
  row,
  col,
  tree,
  Report
]
const install = Vue => {
  components.map(item => {
    // 注册全局组件
    // 组件名是什么?
    // button 为例子
    // item === ./button/src/button.vue 组件实例对象
    // item.name ==== 'CtButton'
    Vue.component(item.name, item)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}


// components.map(item => {
//   // 变量名 能不能 引入变量的方式
//   export const [item] = {
//     install(Vue) {
//       Vue.component(item.name, Button)

//     }
//   }
// })

// 按需导入

// export const ctButton = {
//   install(Vue) {
//     Vue.component(Button.name, Button)

//   }
// }
// export const ctInput = {
//   install() {

//   }
// }