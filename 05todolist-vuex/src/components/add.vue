<template>
  <div id="todolistAdd">
    <input
      type="text"
      class="form-control"
      v-model="newTodoText"
      @keyup.enter="handleAdd(newTodoText)"
    >
    <button type="button" class="btn btn-primary" v-on:click="handleAdd(newTodoText)">添加</button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Add",
  data() {
    return {
      newTodoText: ""
    };
  },
  computed: {
    ...mapState(["todos"])
  },
  methods: {
    handleAdd(newTodoText) {
      this.addTodo(newTodoText);
      this.newTodoText = "";
    },
    ...mapActions(["addTodo"])
  }
};
</script>

