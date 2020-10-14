import {ADD_TASK, REMOVE_TASK, SET_TASKS, UPDATE_TASK} from './taskType'
import {addTodo, removeTodo, setTodos} from '../todolist/todolistReducer'
import {TaskAPIType, UpdateTaskModelType} from '../../api/apiType'
import {Dispatch} from 'redux'
import {taskAPI} from '../../api/api'
import {AppRootStateType} from '../store'
import {setAppErrorAC, setAppStatusAC} from '../app/appReducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'

// actions =============================================================================================================

type AddTaskActionType = { type: typeof ADD_TASK, task: TaskAPIType }
export const addTaskAC = (task: TaskAPIType): AddTaskActionType => ({
   type: ADD_TASK,
   task,
})

type RemoveTaskActionType = { type: typeof REMOVE_TASK, todoID: string, taskID: string }
export const removeTaskAC = (todoID: string, taskID: string): RemoveTaskActionType => ({
   type: REMOVE_TASK,
   todoID,
   taskID,
})

type UpdateTaskActionType = { type: typeof UPDATE_TASK, todoID: string, taskID: string, model: UpdateTaskModelType }
export const updateTaskAC = (todoID: string, taskID: string, model: UpdateTaskModelType): UpdateTaskActionType => ({
   type: UPDATE_TASK,
   todoID,
   taskID,
   model,
})

type SetTasksActionType = { type: typeof SET_TASKS, todoID: string, tasks: TaskAPIType[] }
export const setTasksAC = (todoID: string, tasks: TaskAPIType[]): SetTasksActionType => ({
   type: SET_TASKS,
   todoID,
   tasks,
})

export type ActionType
   = AddTaskActionType
   | RemoveTaskActionType
   | UpdateTaskActionType
   | ReturnType<typeof addTodo>
   | ReturnType<typeof removeTodo>
   | ReturnType<typeof setTodos>
   | SetTasksActionType

// thunks ==============================================================================================================

export type UpdateDomainTaskModelType = {
   title?: string
   description?: string
   status?: number
   priority?: number
   startDate?: string
   deadline?: string
}

export const getTasksTC = (todoID: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      taskAPI.getTasks(todoID)
         .then(res => {
            if (!res.data.error) {
               dispatch(setTasksAC(todoID, res.data.items))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               if (res.data.error) {
                  dispatch(setAppErrorAC({error: res.data.error}))
               } else {
                  dispatch(setAppErrorAC({error: 'Oops, some error occurred'}))
               }
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const addTaskTC = (todoID: string, title: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      taskAPI.createTask(todoID, title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(addTaskAC(res.data.data.item))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerAppError(error, dispatch)
         })
   }

export const removeTaskTC = (todoID: string, taskID: string) =>
   (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}))
      taskAPI.deleteTask(todoID, taskID)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTaskAC(todoID, taskID))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerNetworkError(error, dispatch)
         })
   }

export const updateTaskTC = (todoID: string, taskID: string, changingValue: UpdateDomainTaskModelType) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todoID].find(t => t.id === taskID)
      if (!task) {
         console.warn('task not found in the state')
         return
      }
      const model: UpdateTaskModelType = {
         title: task.title,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         description: task.description,
         ...changingValue,
      }
      dispatch(setAppStatusAC({status: 'loading'}))
      taskAPI.updateTask(todoID, taskID, model)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(updateTaskAC(todoID, taskID, model))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerAppError(error, dispatch)
         })
   }
