import {setAppErrorAC, setAppStatusAC} from '../store/app/appReducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/apiType'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppStatusAC({status: 'failed'}))
   if (data.messages && data.messages.length) {
      dispatch(setAppErrorAC({error: data.messages[0]}))
   } else {
      dispatch(setAppErrorAC({error: 'Oops, some error occurred'}))
   }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppErrorAC({error: error.message}))
   dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch
