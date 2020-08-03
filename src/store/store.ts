import {combineReducers, createStore} from 'redux';
import {todolistReducer} from './todolist/todolistReducer';
import {taskReducer} from './task/taskReducer';

const rootReducer = combineReducers({
   todo: todolistReducer,
   task: taskReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
