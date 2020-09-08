import {Dispatch} from 'redux'
import {APP_SET_ERROR, APP_SET_INITIALIZED, APP_SET_STATUS, RequestStatusType} from './appType'
import {authAPI} from '../../api/api';
import {setIsLoggedIn} from '../auth/authAction';

// actions =============================================================================================================

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: null | string) => ({type: APP_SET_ERROR, error} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const setAppInitializedAC = (value: boolean) => ({type: APP_SET_INITIALIZED, value} as const)
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

export type ActionType
   = SetAppStatusActionType
   | SetAppErrorActionType
   | SetAppInitializedActionType

// thunks ==============================================================================================================

export const initializeAppTC = () =>
   (dispatch: Dispatch) => {
      authAPI.getMe()
         .then(res => {
            dispatch(setAppInitializedAC(true))
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedIn(true))
            } else {
               dispatch(setIsLoggedIn(false))
            }
         })
   }
