import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RequestLoginType} from '../../api/apiType'
import {Dispatch} from 'redux'
import {setAppStatusAC} from '../app/appReducer'
import {authAPI} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'

const initialState = {
   isLoggedIn: false,
}

const slice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isLoggedIn = action.payload.value
      },
   },
})

export const authReducer = slice.reducer

// actions =============================================================================================================

export const {setIsLoggedIn} = {...slice.actions}

// thunks ==============================================================================================================

export const loginTC = (data: RequestLoginType) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      authAPI.login(data)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setAppStatusAC({status: 'succeeded'}))
               dispatch(setIsLoggedIn({value: true}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const logoutTC = () =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      authAPI.logout()
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedIn({value: false}))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }