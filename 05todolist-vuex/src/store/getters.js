// tab过滤
export const getTodos = state => {

    function _getTodos(isCompleted){
        let list = []
        state.todos.forEach(todo => {
            if(todo.complete === isCompleted ){
                list.push(todo)
            }
        });
        return list;
    }
    if(state.filter === 'all'){
        return state.todos
    }else if(state.filter === 'completed'){
        return _getTodos(true)
    }else{
        return _getTodos(false)
    }
}

// 获取全部TODO 条数
export const getAllCounts = state => state.todos.length

// 获取已完成TODO条数
export const getCompletedCounts = state => state.todos.filter(todo => todo.complete === true).length

// 获取未完成TODO条数
export const getUncmpletedCounts = state => state.todos.filter(todo => todo.complete === false).length
