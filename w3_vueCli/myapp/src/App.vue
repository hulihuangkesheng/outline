<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <TodoList>
      <slot></slot>
    </TodoList> -->
    <!-- 自闭合 -->
    <Life v-if="show"/>
      <button @click="show=!show">创建/销毁组件</button>
      
  </div>
</template>

<script>

import TodoList from './components/TodoList/TodoList.vue'
// import HelloWorld from './components/HelloWorld.vue'
import Button from './components/Button.vue'
import Life  from './components/Lifecycle.vue'

import Vue from 'vue';

Vue.component(Button.name,Button)
export default {
  name: 'App',
  data(){
    return {
      show:true
    }
  },
  //单文件组件(使用runtime版本的Vue)：利用webpack(webpack加驰)把template中的内容渲染成render函数
  components: {
    TodoList,
    Life
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
