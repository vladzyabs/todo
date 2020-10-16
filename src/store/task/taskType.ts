import {TaskAPIType} from '../../api/apiType'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_TASKS = 'SET_TASKS'

export type TasksType = TaskAPIType

export type TasksStateType = {
   [key: string]: TasksType[]
}

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: number
   priority?: number
   startDate?: string
   deadline?: string
}
