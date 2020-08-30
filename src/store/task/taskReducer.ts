import {ActionType} from './taskAction'
import {TasksStateType, TasksType} from './taskType'

const initialState: TasksStateType = {}

export const taskReducer = (state = initialState, action: ActionType): TasksStateType => {
   switch (action.type) {
      case 'SET_TODOS':
         const copyState = {...state}
         action.todos.forEach(todo => {
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
      case 'ADD_TODO':
         return {
            ...state,
            [action.todo.id]: [],
         }
      case 'REMOVE_TODO':
         delete state[action.todoID]
         return {...state}
      default:
         return state
   }
}
