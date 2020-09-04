import {APP_SET_ERROR, APP_SET_STATUS, RequestStatusType} from './appType'

// actions =============================================================================================================

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP_SET_STATUS, status} as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: null | string) => ({type: APP_SET_ERROR, error} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type ActionType
   = SetAppStatusActionType
   | SetAppErrorActionType
