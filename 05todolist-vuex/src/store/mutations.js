import Vue from 'vue'
import * as types from './mutations_type'

export const mutations = {
    [types.ADDTODO](state, newTodoText) {
        Vue.set(state.todos, state.todos.length, {
            id: new Date().getTime(),
            content: newTodoText,
            complete: false
        })
    },
    [types.DELTODO](state, index) {
        Vue.delete(state.todos, index)
    },
    [types.HANDLETOGGLE](state, index) {
        state.todos[index].complete = !state.todos[index].complete
    },
    [types.TABCHANGE](state, tabType) {
        state.filter = tabType
    },
    [types.CHOOSETOGGLE](state,todo){
       if(state.choose.includes(todo)){
           state.choose.splice(state.choose.indexOf(todo),1)
       }else{
           state.choose.push(todo)
       }
    },
    [types.DELCHECKED](state){
        if(state.choose){
            for(let i=0; i < state.choose.length; i++){
                state.todos.splice(state.todos.indexOf(state.choose[i]),1)
            }
            state.choose = []
        }else{
            alert('未选择！')
        }
    }
}