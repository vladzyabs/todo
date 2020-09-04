import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../store/app/appAction'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/apiType'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppStatusAC('failed'))
   if (data.messages && data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
   } else {
      dispatch(setAppErrorAC('Oops, some error occurred'))
   }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppErrorAC(error.message))
   dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
