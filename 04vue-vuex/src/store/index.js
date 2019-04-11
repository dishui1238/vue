import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state: {
        count: 1000,
        num:100,
        show: true,
        person: [1, 2, 3, 4],
        todos: [{
                id: 1,
                content: '花谢花飞花满天',
                done: true
            },
            {
                id: 2,
                content: '红消香断有谁怜',
                done: true
            },
            {
                id: 3,
                content: '游丝软系飘春榭',
                done: false
            },
            {
                id: 4,
                content: '落絮轻沾扑绣帘',
                done: false
            },
            {
                id: 5,
                content: '闺中女儿惜春暮',
                done: false
            },
            {
                id: 5,
                content: '愁绪满怀无释处',
                done: false
            },
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        // 通过让 getter 返回一个函数，来实现给 getter 传参
        getTodoById: state => id => {
            return state.todos.find(todo => todo.id === id)
        }
    },
    mutations: {
        increment: state => state.count++,
        decrement: (state,n) => state.count -=n,
        double: state => state.count*=2
    },
    actions:{
        increment({commit}){
          commit('increment')
        }
    }

})