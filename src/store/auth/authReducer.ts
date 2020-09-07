import {ActionType} from './authAction'
import {AuthStateType} from './authType'


const initialState: AuthStateType = {
   isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ActionType): AuthStateType => {
   switch (action.type) {
      case 'AUTH/SET_IS_LOGGED_IN':
         debugger
         return {...state, isLoggedIn: action.status}
      default:
         return state
   }
}
