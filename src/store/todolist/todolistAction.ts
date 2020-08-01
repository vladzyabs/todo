import {ADD_TODO, CHANGE_FILTER_TODO, CHANGE_TITLE_TODO, FilterType, REMOVE_TODO} from './todolistsType';

type AddTodoActionType = { type: typeof ADD_TODO, title: string }
export const addTodoAC = (title: string): AddTodoActionType => {
   return {
      type: ADD_TODO,
      title: title,
   }
}

type RemoveTodoActionType = { type: typeof REMOVE_TODO, todoID: string }
export const removeTodoAC = (todoID: string): RemoveTodoActionType => {
   return {
      type: REMOVE_TODO,
      todoID: todoID,
   }
}

type ChangeTitleTodoActionType = { type: typeof CHANGE_TITLE_TODO, todoID: string, newValue: string }
export const changeTitleTodoAC = (todoID: string, newValue: string): ChangeTitleTodoActionType => {
   return {
      type: CHANGE_TITLE_TODO,
      todoID: todoID,
      newValue: newValue,
   }
}

type ChangeFilterTodoActionType = { type: typeof CHANGE_FILTER_TODO, todoID: string, newValue: FilterType }
export const changeFilterTodoAC = (todoID: string, newValue: FilterType): ChangeFilterTodoActionType => {
   return {
      type: CHANGE_FILTER_TODO,
      todoID: todoID,
      newValue: newValue,
   }
}

export type ActionType
   = AddTodoActionType
   | RemoveTodoActionType
   | ChangeTitleTodoActionType
   | ChangeFilterTodoActionType
