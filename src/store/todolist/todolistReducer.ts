import {ActionType} from './todolistAction';
import {TodolistType} from './todolistsType';

export const todolistReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
   switch (action.type) {
      case 'ADD_TODO':
         return [
            {id: action.todoID, title: action.title, filter: 'all'},
            ...state,
         ]
      case 'REMOVE_TODO':
         return state.filter(t => t.id !== action.todoID)
      case 'CHANGE_TITLE_TODO':
         return state.map(t => {
            if (t.id === action.todoID) {
               t.title = action.newValue
               return t
            }
            return t
         })
      case 'CHANGE_FILTER_TODO':
         return state.map(t => {
            if (t.id === action.todoID) {
               t.filter = action.newValue
               return t
            }
            return t
         })
      default:
         return {...state}
   }
}
