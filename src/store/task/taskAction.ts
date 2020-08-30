import {ADD_TASK, CHANGE_STATUS_TASK, CHANGE_TITLE_TASK, REMOVE_TASK, SET_TASKS} from './taskType'
import {AddTodoActionType, RemoveTodoActionType, SetTodosActionType} from '../todolist/todolistAction'
import {TaskAPIType, TaskStatuses, UpdateTaskModelType} from '../../api/apiType'
import {Dispatch} from 'redux'
import {taskAPI} from '../../api/api'
import {AppRootStateType} from '../store'

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

type ChangeStatusTaskActionType = { type: typeof CHANGE_STATUS_TASK, todoID: string, taskID: string, newValue: TaskStatuses }
export const changeStatusTaskAC = (todoID: string, taskID: string, newValue: TaskStatuses): ChangeStatusTaskActionType => ({
   type: CHANGE_STATUS_TASK,
   todoID,
   taskID,
   newValue,
})

type ChangeTitleTaskActionType = { type: typeof CHANGE_TITLE_TASK, todoID: string, taskID: string, newValue: string }
export const changeTitleTaskAC = (todoID: string, taskID: string, newValue: string): ChangeTitleTaskActionType => ({
   type: CHANGE_TITLE_TASK,
   todoID,
   taskID,
   newValue,
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
   | ChangeStatusTaskActionType
   | ChangeTitleTaskActionType
   | AddTodoActionType
   | RemoveTodoActionType
   | SetTodosActionType
   | SetTasksActionType

// thunks ==============================================================================================================

export const getTasksTC = (todoID: string) =>
   (dispatch: Dispatch) => {
      taskAPI.getTasks(todoID)
         .then(res => {
            dispatch(setTasksAC(todoID, res.data.items))
         })
   }

export const addTaskTC = (todoID: string, title: string) =>
   (dispatch: Dispatch) => {
      taskAPI.createTask(todoID, title)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(addTaskAC(res.data.data.item))
            }
         })
   }

export const removeTaskTC = (todoID: string, taskID: string) =>
   (dispatch: Dispatch) => {
      taskAPI.deleteTask(todoID, taskID)
         .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(removeTaskAC(todoID, taskID))
            }
         })
   }

export const changeTaskStatusTC = (todoID: string, taskID: string, status: TaskStatuses) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().task[todoID].find(t => taskID === t.id)
      if (task) {
         const model: UpdateTaskModelType = {
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
         }
         taskAPI.updateTask(todoID, taskID, model)
            .then(res => {
               if (res.data.resultCode === 0) {
                  dispatch(changeStatusTaskAC(todoID, taskID, status))
               }
            })
      }
   }

export const changeTaskTitleTC = (todoID: string, taskID: string, title: string) =>
   (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().task[todoID].find(t => taskID === t.id)
      if (task) {
         const model: UpdateTaskModelType = {
            title: title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
         }
         taskAPI.updateTask(todoID, taskID, model)
            .then(res => {
               if (res.data.resultCode === 0) {
                  dispatch(changeTitleTaskAC(todoID, taskID, title))
               }
            })
      }
   }
