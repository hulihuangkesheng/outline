<template>
  <footer>
    <slot :list="list.lenght" :complete="completelist.lenght" :unComplete="unCompletelist.lenght">
        <div>总数：{{list.length}}，完成：{{completelist.length}}，未完成：{{unCompletelist.length}}</div>
    </slot>
  </footer>
</template>
<script>
export default {
  props: ["list"],
  computed: {
    completelist() {
      return this.list.filter(item => item.done);
    },
    unCompletelist() {
      return this.list.filter(item => !item.done);
    }
  }
};
</script>
