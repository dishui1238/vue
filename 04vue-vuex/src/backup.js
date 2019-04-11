<template>
  <div id="app">
    <div id="container">
      <!-- footer -->
      <div class="footer todoItem">
        <p>共{{this.todolist.length}}项任务，已完成{{completedCounts}}项，未完成{{uncompletedCounts}}项</p>
      </div>
      <!-- /footer -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");
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
