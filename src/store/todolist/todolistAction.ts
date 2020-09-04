import {ADD_TODO, CHANGE_FILTER_TODO, CHANGE_TITLE_TODO, FilterType, REMOVE_TODO, SET_TODOS} from './todolistsType'
import {TodoAPIType} from '../../api/apiType'
import {Dispatch} from 'redux'
import {todoAPI} from '../../api/api'
import {setAppStatusAC} from '../app/appAction'

// actions =============================================================================================================

export type AddTodoActionType = { type: typeof ADD_TODO, todo: TodoAPIType }
export const addTodoAC = (todo: TodoAPIType): AddTodoActionType => ({
   type: ADD_TODO,
   todo,
})

export type RemoveTodoActionType = { type: typeof REMOVE_TODO, todoID: string }
export const removeTodoAC = (todoID: string): RemoveTodoActionType => ({
   type: REMOVE_TODO,
   todoID,
})

type ChangeTitleTodoActionType = { type: typeof CHANGE_TITLE_TODO, todoID: string, newValue: string }
export const changeTitleTodoAC = (todoID: string, newValue: string): ChangeTitleTodoActionType => ({
   type: CHANGE_TITLE_TODO,
   todoID,
   newValue,
})

type ChangeFilterTodoActionType = { type: typeof CHANGE_FILTER_TODO, todoID: string, newValue: FilterType }
export const changeFilterTodoAC = (todoID: string, newValue: FilterType): ChangeFilterTodoActionType => ({
   type: CHANGE_FILTER_TODO,
   todoID,
   newValue,
})

export type SetTodosActionType = { type: typeof SET_TODOS, todos: TodoAPIType[] }
export const setTodosAC = (todos: TodoAPIType[]): SetTodosActionType => ({
   type: SET_TODOS,
   todos,
})

export type ActionType
   = AddTodoActionType
   | RemoveTodoActionType
   | ChangeTitleTodoActionType
   | ChangeFilterTodoActionType
   | SetTodosActionType

// thunks ==============================================================================================================

export const getTodosTC = (dispatch: Dispatch) => {
   dispatch(setAppStatusAC('loading'))
   todoAPI.getTodos()
      .then(res => {
         dispatch(setTodosAC(res.data))
         dispatch(setAppStatusAC('succeeded'))
      })
}

export const addTodoTC = (title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      todoAPI.createTodo(title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(addTodoAC(res.data.data.item))
               dispatch(setAppStatusAC('succeeded'))
            }
         })
   }

export const removeTodoTC = (todoID: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      todoAPI.deleteTodo(todoID)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTodoAC(todoID))
               dispatch(setAppStatusAC('succeeded'))
            }
         })
   }

export const updateTodoTitleTC = (todoID: string, title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      todoAPI.updateTodo(todoID, title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(changeTitleTodoAC(todoID, title))
               dispatch(setAppStatusAC('succeeded'))
            }
         })
   }
