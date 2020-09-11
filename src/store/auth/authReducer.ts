import {authStateType} from './authType'
import {ActionType} from './authAction'

const initialState: authStateType = {
   isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionType): authStateType => {
   switch (action.type) {
      case 'LOGIN/SET_IS_LOGGED_IN':
         return {...state, isLoggedIn: action.value}
      default:
         return state
   }
}
