<template>
    <div>
        <div class="todoItem" v-for="todo in filterTodolist" :key="todo.id">
          <input type="checkbox" v-model="checkData" :value="todo">
          {{todo.content}}
          <button
            type="button"
            class="btn btn-danger"
            @click="delTODO(todo)"
          >删除</button>
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
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name:'Item'
    }
</script>

<style lang="scss" scoped>

</style>