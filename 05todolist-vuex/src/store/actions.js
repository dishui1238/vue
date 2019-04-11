// import Vue from 'vue'
// import mutations from './mutations'
import * as types from './mutations_type'

export const addTodo = ({commit}, newTodoText) => {
    commit (types.ADDTODO, newTodoText)
}

export const delTodo = ({commit},index) => {
    commit (types.DELTODO, index)
}

export const handleToggle = ({commit},index) => {
    commit (types.HANDLETOGGLE, index)
}

export const tabChange = ({commit},tabType) => {
    commit (types.TABCHANGE, tabType)
}

export const chooseToggle = ({commit},todo) => {
    commit (types.CHOOSETOGGLE, todo)
}

export const delChecked = ({commit}) => {
    commit (types.DELCHECKED)
}