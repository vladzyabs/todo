import {EntityStatusType, FilterType, TodolistType} from './todolistsType'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TodoAPIType} from '../../api/apiType'
import {Dispatch} from 'redux'
import {setAppStatus} from '../app/appReducer'
import {todoAPI} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'

const initialState = [] as TodolistType[]

const slice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      addTodo: (state, action: PayloadAction<{ todo: TodoAPIType }>) => {
         return [
            {...action.payload.todo, filter: 'all', entityStatus: 'idle'},
            ...state,
         ]
      },
      removeTodo: (state, action: PayloadAction<{ todoID: string }>) => {
         return state.filter(t => t.id !== action.payload.todoID)
      },
      changeTitleTodo: (state, action: PayloadAction<{ todoID: string, title: string }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].title = action.payload.title
      },
      changeFilterTodo: (state, action: PayloadAction<{ todoID: string, filter: FilterType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].filter = action.payload.filter
      },
      setTodos: (state, action: PayloadAction<{ todos: TodoAPIType[] }>) => {
         return action.payload.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
      },
      setTodoEntityStatus: (state, action: PayloadAction<{ todoID: string, status: EntityStatusType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].entityStatus = action.payload.status
      },
   },
})

export const todolistReducer = slice.reducer

// actions =============================================================================================================

export const {
   addTodo,
   removeTodo,
   changeFilterTodo,
   changeTitleTodo,
   setTodos,
   setTodoEntityStatus,
} = {...slice.actions}

// thunks ==============================================================================================================

export const getTodosTC = () => (dispatch: Dispatch) => {
   dispatch(setAppStatus({status: 'loading'}))
   todoAPI.getTodos()
      .then(res => {
         dispatch(setTodos({todos: res.data}))
         dispatch(setAppStatus({status: 'succeeded'}))
      })
      .catch(error => {
         handleServerNetworkError(error, dispatch)
      })
}

export const addTodoTC = (title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatus({status: 'loading'}))
      todoAPI.createTodo(title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(addTodo({todo: res.data.data.item}))
               dispatch(setAppStatus({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const removeTodoTC = (todoID: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatus({status: 'loading'}))
      dispatch(setTodoEntityStatus({todoID, status: 'loading'}))
      todoAPI.deleteTodo(todoID)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTodo({todoID}))
               dispatch(setAppStatus({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const updateTodoTitleTC = (todoID: string, title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatus({status: 'loading'}))
      todoAPI.updateTodo(todoID, title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(changeTitleTodo({todoID, title}))
               dispatch(setAppStatus({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }