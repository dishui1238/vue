# Vue

## 基础
- 声明式开发：vue
- 命令式开发: jquery

#### Vue指令
- {{ 表达式 }} 
- v-model 双向数据绑定
- v-html 相当于textContent
- v-text 相当于innerHTML
- v-bind 简写 ':',强制数据绑定
- v-on 绑定事件监听
- v-if 隐藏元素，移除DOM元素
- v-else
- v-show 隐藏元素，DOM元素并未移除
- v-for 遍历

- :class='colorRed' 绑定class
- :style='{color:isActive,font-size:font-size}' 绑定style对象 **驼峰写法**
- :style='[c,b]'

- ref 为某个元素注册一个唯一标识，vue通过$refs属性访问这个元素
- v-cloak 防止闪现表达式，与css配合：`[v-cloak]{display:none}`

**自定义指令**
1. 定义全局指令
   - el:指令属性所在的标签对象
   - binding:包含指令相关信息的数据对象
```js
Vue.directive('uppper-text',function(el,binding){
    el.textContent = binding.value.toUpperCase()
})
```

2. 自定义局部指令:只在当前el管理范围内有效
```js
new Vue({
    directives:{
        'lower-text':function(el,binding){
            el.textContent = binding.value.toLowerCase()
        }
    }
})
```
#### 计算属性computed


#### 传参
`@click='clickFunc(id,$event)'` 传递参数的同时传递event

#### 事件修饰符
- `@click.stop='clickFunc'` 阻止事件冒泡
- `@click.prevent='clickFunc'` 阻止事件默认行为

#### 按键修饰符
- `@keyup.enter='func'` 按键enter监听

#### vue 生命周期
- 初始化:该阶段只执行一次
    + beforeCreate
    + created
    + beforeMount
    + mouted：常做一些一步操作，发送ajax请求，启动定时器
- 更新：执行n次
    + beforeUpdate
    + updated
- 死亡
    + beforeDestory：收尾工作，如清理定时器
    + destoryed

#### 过渡&动画
- v-enter
- v-enter-to
- v-leave
- v-leave-to

#### 过滤器

#### 父子组件通信
1. 父组件传递给子组件：父组件标签绑定:message,子组件获取props:['message']

2. 类型验证：`props:{message:[Number],required:true,default:22}`

3. 子组件传递给父组件：子组件定义一个方法，`this.$emit('listen(事件名称)',this.msg(传递的数据))`,父组件@listen='执行函数名'

## vue-cli 脚手架
- `cnpm install -g @vue/cli` 安装(v3.5.5)
- `vue create hello-world` 快速构建一个项目

## vue-router

#### 传参方式
1. 使用query传递参数
2. 使用params传递参数
```js
<router-link to="/login/crystal" tag="span">登录</router-link>

routes: [ //路由匹配规则有两个属性
                // 属性1.path 表示监听那个路由链接地址
                // 属性2.component 需要展示的组件,值必须是一个组件的模板对象，不能是组件的引用名称
                
                {
                    path: '/login/:name',
                    component: login
                },
]
```

## Vuex
#### State
> store 单一状态树，唯一的数据源

1. Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中
```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  render: h => h(App),
// 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  store,
}).$mount('#app')
```
```js
// /src/store/index.js
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        count:1000,
        show:true,
        person:[1,2,3,4]
    }
})
```
2. 子组件访问state
```js
// App.vue
<template>
  <div>
    <div>{{count}}</div>
    <div>{{show}}</div>
    <div>{{person}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  // computed: mapState({
  //   count: state => state.count,
  //   show: state => state.show,
  //   person: state => state.person
  // })

  computed: {
    // mapState通过扩展运算符将 store.state 映射 this
    //  这个this 很重要，这个映射直接映射到当前Vue的this对象上。
    ...mapState(["count", "show", "person"])
  }
};
</script>
```

#### getter
> 在 store 中定义“getter”（可以认为是 store 的计算属性）。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```js
export default new vuex.Store({
    state: {
        todos: [{id: 1,content: '花谢花飞花满天',done: true}]},
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }

})
```
1. 通过属性访问 `$store.getters.doneTodos`
Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值:`$store.getters.doneTodos`,getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的
```html
// App.vue
<li v-for="todo in $store.getters.doneTodos" :key="todo.id">{{todo.content}} </li>
```
2. 通过方法访问 

通过让 getter 返回一个函数，来实现给 getter 传参
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
**注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。**

3. mapGetters辅助函数
> mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
```js
  computed: {
    ...mapState(["count", "show", "person"]),
    ...mapGetters(['getTodoById'])
    // 将一个 getter 属性另取一个名字，使用对象形式
    mapGetters({doneCount:'doneTodosCount'})
  },
  ```

#### Mutation
> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```js
export default new vuex.Store({
    //....
    mutations: {
        increment: state => state.count++
    }
})
```

```html
<button @click="$store.commit('increment')">++</button>
```

##### 提交载荷(Payload)
> 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：
```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
    //   对象形式
    increment (state, payload) {
        state.count += payload.amount
    }
}
```
```html
<button @click="$store.commit('decrement',2)">-2</button>
<!-- 或者以对象风格提交 -->
<button @click="$store.commit(type:'decrement'amount:2)">-2</button>
```
**Mutation 必须是同步函数**

##### 在组件中提交Mutation


#### Action
> Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
//   参数结构方式（常用）
actions: {
  increment ({ commit }) {
  commit('increment')
  }
}
})
```
#### 分发action
1. $store.dispatch('xxx')
2. mapActions 辅助函数:将组件的 methods 映射为 store.dispatch 调用

###test git
