<template>
  <div>
    <div>{{show}}</div>
    <div>{{person}}</div>

    <span>{{count}}</span>
    <!-- <button @click="$store.commit('increment')">++</button> -->
    <button @click="increment">++</button>
    <!-- <button @click="$store.dispatch('increment')">Action++</button> -->
    <button @click="increment">Action++</button>
    <button @click="$store.commit('decrement',2)">-2</button>
    <button @click="doubleCount">double</button>
    
    <li v-for="todo in $store.getters.doneTodos" :key="todo.id">{{todo.content}}</li>
    <li>{{$store.getters.getTodoById(3).content}}</li>
    <li>{{getTodoById(4).content}}</li>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "app",
  state: {},
  // computed: mapState({
  //   count: state => state.count,
  //   show: state => state.show,
  //   person: state => state.person
  // })

  computed: {
    // mapState通过扩展运算符将 store.state 映射 this
    //  这个this 很重要，这个映射直接映射到当前Vue的this对象上。
    ...mapState(["count", "show", "person"]),
    ...mapGetters(["getTodoById"])
  },
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'decrement'// 将 `this.decrement(n)` 映射为 `this.$store.commit('decrement', n)`
    ]),
    // 重新命名，对象形式
    ...mapMutations({
      doubleCount:'double'
    }),
    ...mapActions([
      'increment'// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ])
  }
};
</script>

<style lang="scss" scoped>
</style>