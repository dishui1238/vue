import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        todos:[
            {id:new Date().getTime(),content:'测试',complete:false,isEdit:false},
        ],
        filter:'all',
        // 存储选中todo的index值
        choose:[]
    },
    getters,
    mutations,
    actions,
    strict: true // 嚴格模式，禁止直接修改 state
})