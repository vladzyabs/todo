import {ActionType} from './taskAction'
import {TasksStateType, TasksType} from './taskType'
import {setTodos, addTodo, removeTodo} from '../todolist/todolistReducer'

const initialState: TasksStateType = {}

export const taskReducer = (state = initialState, action: any): TasksStateType => {
   switch (action.type) {
      case setTodos.type:
         const copyState = {...state}
         action.payload.todos.forEach((todo: any) => {
            return copyState[todo.id] = []
         })
         return copyState
      case 'SET_TASKS':
         const copyStatee = {...state}
         copyStatee[action.todoID] = action.tasks
         return copyStatee
      case 'ADD_TASK':
         const newTask: TasksType = action.task
         return {
            ...state,
            [action.task.todoListId]: [newTask, ...state[action.task.todoListId]],
         }
      case 'REMOVE_TASK':
         return {
            ...state,
            [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID),
         }
      case 'UPDATE_TASK':
         return {
            ...state,
            [action.todoID]: state[action.todoID].map(t => {
               if (t.id !== action.taskID) return t
               return {...t, ...action.model}
            }),
         }
      case addTodo.type:
         return {
            ...state,
            [action.payload.todo.id]: [],
         }
      case removeTodo.type:
         delete state[action.payload.todoID]
         return {...state}
      default:
         return state
   }
}
