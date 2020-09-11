export const APP_SET_STATUS = 'APP/SET_STATUS'
export const APP_SET_ERROR = 'APP/SET_ERROR'
export const APP_SET_INITIALIZED = 'APP/SET_INITIALIZED'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
   status: RequestStatusType
   error: null | string
   isInitialized: boolean
}
