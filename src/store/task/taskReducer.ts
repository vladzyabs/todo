import {ActionType} from './taskAction';
import {TasksStateType} from './taskType';
import {v1} from 'uuid';

const initialState: TasksStateType = {}

export const taskReducer = (state = initialState, action: ActionType): TasksStateType => {
   switch (action.type) {
      case 'ADD_TASK':
         const newTask = {id: v1(), title: action.title, isDone: false}
         return {
            ...state,
            [action.todoID]: [newTask, ...state[action.todoID]],
         }
      case 'REMOVE_TASK':
         return {
            ...state,
            [action.todoID]: [...state[action.todoID].filter(t => t.id !== action.taskID)],
         }
      case 'CHANGE_STATUS_TASK':
         return {
            ...state,
            [action.todoID]: [...state[action.todoID].map(t => {
               if (t.id !== action.taskID) return t
               return {...t, isDone: action.newValue}
            })]
         }
      case 'CHANGE_TITLE_TASK':
         return {
            ...state,
            [action.todoID]: [...state[action.todoID].map(t => {
               if (t.id !== action.taskID) return t
               return {...t, title: action.newValue}
            })]
         }
      case 'ADD_TODO':
         return {
            ...state,
            [action.todoID]: []
         }
      case 'REMOVE_TODO':
         delete state[action.todoID]
         return {...state}
      default:
         return {...state}
   }
}