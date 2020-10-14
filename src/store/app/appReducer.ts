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
      setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
         state.status = action.payload.status
      },
      setAppErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
         state.error = action.payload.error
      },
      setAppInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isInitialized = action.payload.value
      },
   },
})

export const appReducer = slice.reducer

//actions ==============================================================================================================

export const {
   setAppErrorAC,
   setAppStatusAC,
   setAppInitializedAC,
} = {...slice.actions}


// thunks ==============================================================================================================

export const initializeAppTC = () =>
   (dispatch: Dispatch) => {
      authAPI.getMe()
         .then(res => {
            dispatch(setAppInitializedAC({value: true}))
            dispatch(setAppStatusAC({status: 'loading'}))
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedIn({value: true}))
            } else {
               dispatch(setAppStatusAC({status: 'failed'}))
            }
         })
         .catch(error => {
            dispatch(setAppInitializedAC({value: true}))
            handleServerNetworkError(error, dispatch)
         })
   }