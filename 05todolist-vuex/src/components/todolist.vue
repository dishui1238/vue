<template>
  <div id="container">
    <Add/>
    <div id="todolist">
      <div class="todolist-header">
        <span>任务列表</span>
        <button
          type="button"
          class="btn"
          @click="tabChange('uncompleted')"
          :class="{active:filter==='uncompleted'}"
        >未完成</button>
        <button
          type="button"
          class="btn"
          @click="tabChange('completed')"
          :class="{active:filter==='completed'}"
        >已完成</button>
        <button
          type="button"
          class="btn"
          @click="tabChange('all')"
          :class="{active:filter==='all'}"
        >全部</button>
      </div>
      <!-- todoItem -->
      <Item v-for="(todo,index) in getTodos" :key="todo.id" :todo="todo" :index="index"/>
      <!-- /todoItem -->
      <div class="todoItem">
        <input id="checkedAll" type="checkbox">
        <button type="button" class="btn btn-danger" @click="delChecked">删除所选</button>
      </div>

      <!-- footer -->
      <div class="footer todoItem">
        <p>共{{getAllCounts}}项任务，已完成{{getCompletedCounts}}项，未完成{{getUncmpletedCounts}}项</p>
      </div>
      <!-- /footer -->
    </div>
  </div>
</template>

<script>
import Add from "./add";
import Item from "./item";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "TodoList",
  components: { Add, Item },
  computed: {
    ...mapState(["todos", "filter", "choose"]),
    ...mapGetters([
      "getTodos",
      "getAllCounts",
      "getCompletedCounts",
      "getUncmpletedCounts"
    ])
  },
  watch: {
    "choose": {
      handler() {
        if (this.choose.length === this.todos.length && this.todos.length !== 0) {
          document.getElementById("checkedAll").checked = true;
        } else {
          document.getElementById("checkedAll").checked = false;
        }
      }
    },
    deep:true
  },
  methods: {
    // ...mapMutations(),
    ...mapActions(["tabChange","delChecked"])
  }
};
</script>

