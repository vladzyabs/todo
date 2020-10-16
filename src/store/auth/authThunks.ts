import {FieldErrorType, RequestLoginType} from '../../api/apiType'
import {setAppStatus} from '../app/appReducer'
import {authAPI} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchTodo} from '../todolist/todolistThunks'
import {resetTasks} from '../task/taskReducer'
import {AxiosError} from 'axios'

export const login = createAsyncThunk<{ isLoggedIn: boolean }, RequestLoginType, { rejectValue: { errors: string[], fieldsError?: FieldErrorType[] } }>(
   'auth/login',
   async (data: RequestLoginType, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await authAPI.login(data)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({
               errors: res.data.messages,
               fieldsError: res.data.fieldsErrors,
            })
         }
      } catch (e) {
         const error: AxiosError = e
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue({
            errors: [error.message],
            fieldsError: undefined,
         })
      }
   })

export const logout = createAsyncThunk('auth/logout',
   async (arg, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await authAPI.logout()
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            thunkAPI.dispatch(fetchTodo.fulfilled({todos: []}, 'requestId'))
            thunkAPI.dispatch(resetTasks({}))
            return {isLoggedIn: false}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })
