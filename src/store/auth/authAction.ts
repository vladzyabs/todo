import {LOGIN_SET_IS_LOGGED_IN} from './authType'
import {Dispatch} from 'redux';
import {authAPI} from '../../api/api';
import {setAppStatusAC} from '../app/appAction';
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils';

// actions =============================================================================================================

export const setIsLoggedIn = (value: boolean) => ({type: LOGIN_SET_IS_LOGGED_IN, value} as const)
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export type ActionType
   = SetIsLoggedInActionType

//thunks ===============================================================================================================

export const logoutTC = () =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('loading'))
      authAPI.logout()
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedIn(false))
               dispatch(setAppStatusAC('succeeded'))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }
