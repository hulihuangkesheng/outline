import Vue from 'vue'
import App from './App.vue'

// //ESModule 只允许静态导入 不允许有变量接收地址  但require 支持
// //导入a.js模块中的所有属性，并赋值给a变量
// import * as a from '../moudel/a.js'
// console.log('aaa',a);
// //导入模块中的属性并赋值给name
// import { username as name} from '../moudel/a.js'
// console.log("username",name);
// //导入a.js中属性
// //import default属性,{username,多个属性} from '../moudel/a'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
