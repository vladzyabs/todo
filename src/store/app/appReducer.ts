import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import {authAPI} from '../../api/api'
import {setIsLoggedIn} from '../auth/authReducer'
import {handleServerNetworkError} from '../../utils/errorUtils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
   status: 'idle' as RequestStatusType,
   error: null as null | string,
   isInitialized: false as boolean,
}

const slice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
         state.status = action.payload.status
      },
      setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
         state.error = action.payload.error
      },
      setAppInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isInitialized = action.payload.value
      },
   },
})

export const appReducer = slice.reducer

//actions ==============================================================================================================

export const {
   setAppError,
   setAppStatus,
   setAppInitialized,
} = {...slice.actions}

// thunks ==============================================================================================================

export const initializeAppTC = () =>
   (dispatch: Dispatch) => {
      authAPI.getMe()
         .then(res => {
            dispatch(setAppInitialized({value: true}))
            dispatch(setAppStatus({status: 'loading'}))
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedIn({value: true}))
            } else {
               dispatch(setAppStatus({status: 'failed'}))
            }
         })
         .catch(error => {
            dispatch(setAppInitialized({value: true}))
            handleServerNetworkError(error, dispatch)
         })
   }
