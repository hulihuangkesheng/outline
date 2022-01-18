<template>
    <div class="todolist container">
        <TodoHead v-on:add="addItem"></TodoHead>
        <TodoBody :list="datalist">
          <!-- 在父组件TodoList生成html结构再传入子组件TodoBody渲染 -->
            <template v-slot:head="scope">
                <tr>
                    <th>#{{scope}}</th>
                    <th>todo</th>
                    <th>complete</th>
                    <th>operation</th>
                </tr>
            </template>
            <template v-slot>
            <tr v-for="(item,index) in datalist" :key="item.id">
              <td>{{index+1}}</td>
              <td>{{item.todo}}</td>
              <td>{{item.done ? 'yes' : 'no'}}</td>
              <td>
                <button class="btn btn-primary" @click="completeItem(item.id)">完成</button>
                <button class="btn btn-danger" @click="removeItem(index)">删除</button>
              </td>
            </tr>
          </template>
        </TodoBody>
        <TodoFoot :list="datalist"></TodoFoot>
        <TodoBody :list="datalist" v-slot={selectItem,selectIds}>
            <tr v-for="(item,index) in datalist" :key="item.id" @click="selectItem(item.id)">
              <td><input type="checkbox" :checked="selectIds.includes(item.id)" /></td>
              <td>{{index+1}}</td>
              <td>{{item.todo}}</td>
              <td>{{item.addtime}}</td>
              <td>{{item.done ? 'yes' : 'no'}}</td>
              <td>
                <button class="btn btn-primary" @click="completeItem(item.id)">完成</button>
                <button class="btn btn-danger" @click="removeItem(index)">删除</button>
              </td>
            </tr>
        </TodoBody>
        <TodoFoot :list="datalist"></TodoFoot>
    </div>
</template>
<script>
import TodoHead from './TodoHead.vue';
import TodoBody from './TodoBody.vue';
import TodoFoot from './TodoFoot.vue';
import 'bootstrap/dist/css/bootstrap.css'
export default {
  data() {
    return {
      datalist: [
        {
          id: 1,
          todo: "赚他一个亿津巴布韦币",
          done: true,
          addtime: Date.now() + 3600 * 1000
        },
        {
          id: 2,
          todo: "迎娶白富美，达到人生巅峰",
          done: false,
          addtime: Date.now() + 3600 * 1000 * 5
        },
        {
          id: 3,
          todo: "出任CEO，达到疯癫状态",
          done: false,
          addtime: Date.now()
        }
      ]
    };
  },
  provide: function() {
    return {
      removeItem: this.removeItem,
      completeItem: this.completeItem
    };
  },
  components: {
    TodoHead,
    TodoBody,
    TodoFoot
  },
  methods: {
    addItem(todo) {
      console.log("todo", todo);
      const newItem = {
        id: parseInt(Math.random() * 10000),
        // todo:输入框的内容
        todo,
        done: false,
        addtime: Date.now()
      };
      // 添加到前面位置
      this.datalist.unshift(newItem);
    },
    completeItem(id) {
      this.datalist.forEach(item => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    removeItem(idx) {
      this.datalist.splice(idx, 1);
    }
  }
};
</script>
<style>
</style>