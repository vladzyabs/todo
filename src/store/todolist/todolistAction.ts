import {ADD_TODO, CHANGE_FILTER_TODO, CHANGE_TITLE_TODO, FilterType, REMOVE_TODO} from './todolistsType';
import {v1} from 'uuid';

export type AddTodoActionType = { type: typeof ADD_TODO, todoID: string, title: string }
export const addTodoAC = (title: string): AddTodoActionType => {
   return {
      type: ADD_TODO,
      todoID: v1(),
      title,
   }
}

export type RemoveTodoActionType = { type: typeof REMOVE_TODO, todoID: string }
export const removeTodoAC = (todoID: string): RemoveTodoActionType => {
   return {
      type: REMOVE_TODO,
      todoID,
   }
}

type ChangeTitleTodoActionType = { type: typeof CHANGE_TITLE_TODO, todoID: string, newValue: string }
export const changeTitleTodoAC = (todoID: string, newValue: string): ChangeTitleTodoActionType => {
   return {
      type: CHANGE_TITLE_TODO,
      todoID,
      newValue,
   }
}

type ChangeFilterTodoActionType = { type: typeof CHANGE_FILTER_TODO, todoID: string, newValue: FilterType }
export const changeFilterTodoAC = (todoID: string, newValue: FilterType): ChangeFilterTodoActionType => {
   return {
      type: CHANGE_FILTER_TODO,
      todoID,
      newValue,
   }
}

export type ActionType
   = AddTodoActionType
   | RemoveTodoActionType
   | ChangeTitleTodoActionType
   | ChangeFilterTodoActionType
