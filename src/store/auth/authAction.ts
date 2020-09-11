import {LOGIN_SET_IS_LOGGED_IN} from './authType'

// actions =============================================================================================================

export const setIsLoggedIn = (value: boolean) => ({type: LOGIN_SET_IS_LOGGED_IN, value} as const)
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export type ActionType
   = SetIsLoggedInActionType
