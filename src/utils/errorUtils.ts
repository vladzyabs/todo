import {setAppError, setAppStatus} from '../store/app/appReducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/apiType'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppStatus({status: 'failed'}))
   if (data.messages && data.messages.length) {
      dispatch(setAppError({error: data.messages[0]}))
   } else {
      dispatch(setAppError({error: 'Oops, some error occurred'}))
   }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppError({error: error.message}))
   dispatch(setAppStatus({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
