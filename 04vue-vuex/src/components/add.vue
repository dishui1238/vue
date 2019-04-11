<template>
    <div id="todolistAdd">
        <input type="text" class="form-control" v-model="newTodo">
        <button type="button" class="btn btn-primary" @click="addTODO">添加</button>
      </div>
</template>

<script lang="ts">
    export default {
        name:'Add'
    }
</script>

<style lang="scss" scoped>

</style>