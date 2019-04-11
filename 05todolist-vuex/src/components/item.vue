<template>
 
    <div class="todoItem">
      <input type="checkbox" @click="chooseToggle(todo)">{{todo.content}}
      <button type="button" class="btn btn-danger" @click="delTodo(index)">删除</button>
      <button type="button" class="btn btn-warning" v-if="!todo.complete" @click="handleToggle(index)">标记完成</button>
      <button type="button" class="btn btn-success" v-if="todo.complete" @click="handleToggle(index)">标记未完成</button>
    </div>
 
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "Item",
  props:['todo','index'],
  computed: {
    ...mapState(['choose'])
  },
  methods: {
    ...mapActions(['delTodo','handleToggle','chooseToggle'])
  },
};
</script>
