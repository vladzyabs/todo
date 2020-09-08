import {AppStateType} from './appType'
import {ActionType} from './appAction'

const initialState: AppStateType = {
   status: 'idle',
   error: null,
   initialized: false
}

export const appReducer = (state = initialState, action: ActionType): AppStateType => {
   switch (action.type) {
      case 'APP/SET_STATUS':
         return {...state, status: action.status}
      case 'APP/SET_ERROR':
         return {...state, error: action.error}
      case 'APP/SET_INITIALIZED':
         return {...state, initialized: action.value}
      default:
         return state
   }
}
