import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  render: h => h(App),
// 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  store,
}).$mount('#app')