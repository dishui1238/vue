<template>
  <div id="app">
    <div id="container">
      <!-- add -->
      <div id="todolistAdd">
        <input type="text" class="form-control" v-model="newTodo">
        <button type="button" class="btn btn-primary" @click="addTODO">添加</button>
      </div>
      <!-- /add -->

      <!-- todolist -->
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
        <!-- /todoItem -->
        <div class="todoItem">
          <input id="checkedAll" type="checkbox" ref="checkAll" @click="checkAll($event)">
          <button type="button" class="btn btn-danger" @click="delChecked">删除所选</button>
        </div>
      </div>
      <!-- /todolist -->

      <!-- footer -->
      <div class="footer todoItem">
        <p>共{{this.todolist.length}}项任务，已完成{{completedCounts}}项，未完成{{uncompletedCounts}}项</p>
      </div>
      <!-- /footer -->
    </div>
  </div>
</template>

<script>
// 数据持久化
const STORAGE_KEY = "vue-todo";
let Store = {
  save(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [];
  }
};

//功能:删除数组中指定值
//参数:arr目标数组，value需要删除的值
//返回:在原数组上修改数组.
function removeByValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

export default {
  name: "app",
  data() {
    return {
      todolist: Store.fetch() || [],
      newTodo: "",
      checkData: [],
      tabType: "all",
      filterTodolist: []
    };
  },
  watch: {
    todolist: {
      handler: todo => {
        Store.save(todo);
      },
      deep: true
    },

    checkData: {
      handler() {
        if (
          this.checkData.length === this.todolist.length &&
          this.checkData.length !== 0
        ) {
          document.getElementById("checkedAll").checked = true;
        } else {
          document.getElementById("checkedAll").checked = false;
        }
      },
      deep: true
    }
  },
  computed: {
    completedCounts: function() {
      return this.todolist.filter(todo => todo.complete === true).length;
    },
    uncompletedCounts: function() {
      return this.todolist.filter(todo => todo.complete === false).length;
    }
  },

  methods: {
    isActive(tabType) {
      return tabType === this.tabType;
    },
    addTODO() {
      if (this.newTodo.length !== 0) {
        this.todolist.push({
          id: "todo_" + new Date().getTime(),
          content: this.newTodo,
          complete: false
        });
        this.newTodo = "";
        this.tabChange("all");
      } else {
        alert("请输入内容！");
      }
    },
    delTODO(todo) {
      const res = confirm("确定删除吗？");
      if (res) removeByValue(this.todolist, todo);
      this.tabChange(this.tabType);
    },
    labelComplete(todo) {
      todo.complete = !todo.complete;
      this.tabChange(this.tabType)
    },
    checkAll(e) {
      if (e.target.checked) {
        this.filterTodolist.forEach(el => {
          if (this.checkData.indexOf(el) == -1) {
            this.checkData.push(el);
          }
        });
      } else {
        this.checkData = [];
      }
    },
    delChecked() {
      this.todolist = this.todolist.filter(
        todo => this.checkData.indexOf(todo) == -1
      );
      this.checkData = [];
      // this.$refs.checkAll.checked = false;
      // =========================强制切换tab页触发渲染===============================？？
      this.tabChange(this.tabType);
    },
    tabChange(tabType) {
      switch (tabType) {
        case "all": {
          this.tabType = "all";
          this.filterTodolist = this.todolist;
          return;
        }

        case "completed": {
          this.tabType = "completed";
          this.filterTodolist = this.todolist.filter(
            todo => todo.complete === true
          );
          return;
        }

        case "uncompleted": {
          this.tabType = "uncompleted";
          this.filterTodolist = this.todolist.filter(
            todo => todo.complete === false
          );
          return;
        }

        default:
          return;
      }
    }
  },
  created() {
    this.tabChange("all");
  }
};
</script>


<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.css");
#container {
  width: 50%;
  margin: 50px auto;
}
.form-control {
  width: 200px;
  display: inline-block;
}
#todolist {
  margin-top: 30px;
  position: relative;
}
.todolist-header {
  background-color: #ccc;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 15px;
}
.btn {
  float: right;
  height: 40px;
  margin-top: 10px;
}
.active {
  background-color: rgb(0, 123, 255);
}
.todoItem {
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
</style>
