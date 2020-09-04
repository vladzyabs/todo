import {ActionType} from './todolistAction'
import {TodolistType} from './todolistsType'

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: ActionType): TodolistType[] => {
   switch (action.type) {
      case 'SET_TODOS':
         return action.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
      case 'ADD_TODO':
         return [
            {...action.todo, filter: 'all', entityStatus: 'idle'},
            ...state,
         ]
      case 'REMOVE_TODO':
         return state.filter(t => t.id !== action.todoID)
      case 'CHANGE_TITLE_TODO':
         return state.map(t => {
            if (t.id === action.todoID) {
               return {...t, title: action.newValue}
            }
            return t
         })
      case 'CHANGE_FILTER_TODO':
         return state.map(t => {
            if (t.id === action.todoID) {
               return {...t, filter: action.newValue}
            }
            return t
         })
      case 'TODO/SET_ENTITE_STATUS':
         return state.map(t => {
            if (t.id === action.todoID) {
               return {...t, entityStatus: action.status}
            }
            return t
         })
      default:
         return state
   }
}
