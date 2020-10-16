import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {login, logout} from './authThunks'

const slice = createSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false,
   },
   reducers: {
      setIsLoggedIn: (state, action: PayloadAction<{ value: boolean }>) => {
         state.isLoggedIn = action.payload.value
      },
   },
   extraReducers: builder => {
      builder.addCase(login.fulfilled, (state, action) => {
         state.isLoggedIn = action.payload.isLoggedIn
      })
      builder.addCase(logout.fulfilled, (state, action) => {
         state.isLoggedIn = action.payload.isLoggedIn
      })
   }
})

export const authReducer = slice.reducer

// actions =============================================================================================================

export const {setIsLoggedIn} = {...slice.actions}
