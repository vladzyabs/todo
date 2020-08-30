import {TaskAPIType} from '../../api/apiType'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CHANGE_STATUS_TASK = 'CHANGE_STATUS_TASK'
export const CHANGE_TITLE_TASK = 'CHANGE_TITLE_TASK'
export const SET_TASKS = 'SET_TASKS'

export type TasksType = TaskAPIType

export type TasksStateType = {
   [key: string]: TasksType[]
}
