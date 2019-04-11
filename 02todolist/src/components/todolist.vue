<template>
  <div id="todolist">
    <div class="todolist-header">
      <span>任务列表</span>
      <button type="button" class="btn" :class='{active:isActive}' >未完成</button>
      <button type="button" class="btn" :class='{active:isActive}' >已完成</button>
      <button type="button" class="btn" :class='{active:isActive}' >全部</button>
    </div>
    
    <li v-for="todo in todolist" :key="todo.id">{{todo.content}} </li>

  </div>
</template>

<script>
// import Item from "./todolistItem";

export default {
  name: "List",
//   components: { Item },
  props:['todolist'],
  data(){
      return{
          isActive:false
      }
  }
};
</script>

<style scoped>
#todolist {
  position: relative;
}
.todolist-header {
  background-color:#ccc;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 15px;
}
.btn {
  float: right;
  height: 50px;
}
.active{
    background-color: rgb(0, 123, 255);
}
</style>