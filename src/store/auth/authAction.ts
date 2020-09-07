import {Dispatch} from 'redux'
import {authAPI} from '../../api/api'
import {setAppStatusAC} from '../app/appAction'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {AUTH_SET_IS_LOGGED_IN} from './authType'

// actions =============================================================================================================

export const setIsLoggedIn = (status: boolean) => ({type: AUTH_SET_IS_LOGGED_IN, status} as const)
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export type ActionType
   = SetIsLoggedInActionType

// thunks ==============================================================================================================

export const login = (email: string, password: string, rememberMe: boolean, captcha?: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authAPI.login(email, password, rememberMe)
         .then(res => {
            if (res.data.resultCode === 0) {
               debugger
               dispatch(setAppStatusAC('succeeded'))
               dispatch(setIsLoggedIn(true))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }
