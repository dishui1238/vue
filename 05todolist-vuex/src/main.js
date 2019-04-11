import Vue from 'vue'
import App from './App.vue'
import TodoList from './components/todolist.vue'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/TodoList',
      component: TodoList
    },
    {
      path: '/*',
      redirect: '/TodoList'
    }
  ]
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')