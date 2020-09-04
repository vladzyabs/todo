export const APP_SET_STATUS = 'APP/SET_STATUS'
export const APP_SET_ERROR = 'APP/SET_ERROR'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
   status: RequestStatusType
   error: null | string
}
