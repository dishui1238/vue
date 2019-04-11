<template>
  <div id="todolist">
    <div class="todolist-header">
      <span>任务列表</span>
      <button
        type="button"
        class="btn"
        :class="{active:isActive('uncompleted')}"
        @click="tabChange('uncompleted')"
      >未完成</button>
      <button
        type="button"
        class="btn"
        :class="{active:isActive('completed')}"
        @click="tabChange('completed')"
      >已完成</button>
      <button
        type="button"
        class="btn"
        :class="{active:isActive('all')}"
        @click="tabChange('all')"
      >全部</button>
    </div>
    <!-- todoItem -->
    <!-- <div class="todoItem" v-for="todo in filterTodolist" :key="todo.id">
      <input type="checkbox" v-model="checkData" :value="todo">
      {{todo.content}}
      <button type="button" class="btn btn-danger" @click="delTODO(todo)">删除</button>
      <button
        type="button"
        v-if="!todo.complete"
        class="btn btn-warning"
        @click="labelComplete(todo)"
      >标记完成</button>
      <button
        type="button"
        v-if="todo.complete"
        class="btn btn-success"
        @click="labelComplete(todo)"
      >标记未完成</button>
    </div> -->
    <!-- /todoItem -->
    <div class="todoItem">
      <input id="checkedAll" type="checkbox" ref="checkAll" @click="checkAll($event)">
      <button type="button" class="btn btn-danger" @click="delChecked">删除所选</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "List"
};
</script>

