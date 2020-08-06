import {ActionType} from './todolistAction';
import {TodolistType} from './todolistsType';

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: ActionType): TodolistType[] => {
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
      default:
         return [...state]
   }
}
