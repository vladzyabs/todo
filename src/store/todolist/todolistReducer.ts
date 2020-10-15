import {EntityStatusType, FilterType, TodolistType} from './todolistsType'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setAppStatus} from '../app/appReducer'
import {todoAPI} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'

export const fetchTodo = createAsyncThunk('todo/fetchTodo',
   async (arg, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await todoAPI.getTodos()
         thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
         return {todos: res.data}
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

export const addTodoTC = createAsyncThunk('todo/addTodo',
   async (param: { title: string }, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await todoAPI.createTodo(param.title)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todo: res.data.data.item}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

export const removeTodoTC = createAsyncThunk('todo/removeTodo',
   async (param: { todoID: string }, thunkAPI) => {
      const {todoID} = param
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await todoAPI.deleteTodo(todoID)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoID}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

export const updateTodoTitleTC = createAsyncThunk('todo/updateTodoTitle',
   async (param: {todoID: string, title: string}, thunkAPI) => {
      const {todoID, title} = param
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await todoAPI.updateTodo(todoID, title)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoID, title}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

const initialState = [] as TodolistType[]

const slice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      changeFilterTodo: (state, action: PayloadAction<{ todoID: string, filter: FilterType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].filter = action.payload.filter
      },
      setTodoEntityStatus: (state, action: PayloadAction<{ todoID: string, status: EntityStatusType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].entityStatus = action.payload.status
      },
   },
   extraReducers: builder => {
      builder.addCase(fetchTodo.fulfilled, (state, action) => {
         return action.payload.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
      })
      builder.addCase(addTodoTC.fulfilled, (state, action) => {
         return [
            {...action.payload.todo, filter: 'all', entityStatus: 'idle'},
            ...state,
         ]
      })
      builder.addCase(removeTodoTC.fulfilled, (state, action) => {
         return state.filter(t => t.id !== action.payload.todoID)
      })
      builder.addCase(updateTodoTitleTC.fulfilled, (state, action) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].title = action.payload.title
      })
   },
})

export const todolistReducer = slice.reducer

// actions =============================================================================================================

export const {
   changeFilterTodo,
   setTodoEntityStatus,
} = {...slice.actions}
