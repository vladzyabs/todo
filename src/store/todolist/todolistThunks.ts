import {createAsyncThunk} from '@reduxjs/toolkit'
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
   async (param: { todoID: string, title: string }, thunkAPI) => {
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