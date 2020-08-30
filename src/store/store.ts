import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {todolistReducer} from './todolist/todolistReducer'
import {taskReducer} from './task/taskReducer'

const rootReducer = combineReducers({
   todos: todolistReducer,
   tasks: taskReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
