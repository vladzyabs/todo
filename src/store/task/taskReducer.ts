import {Dispatch} from 'redux'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TaskAPIType, UpdateTaskModelType} from '../../api/apiType'
import {AppRootStateType} from '../store'
import {setAppErrorAC, setAppStatusAC} from '../app/appReducer'
import {setTodos, addTodo, removeTodo} from '../todolist/todolistReducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {TasksStateType, TasksType} from './taskType'
import {taskAPI} from '../../api/api'

const initialState = {} as TasksStateType

const slice = createSlice({
   name: 'tasks',
   initialState,
   reducers: {
      addTask: (state, action: PayloadAction<{ task: TaskAPIType }>) => {
         const newTask: TasksType = action.payload.task
         return {
            ...state,
            [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]],
         }
      },
      removeTask: (state, action: PayloadAction<{ todoID: string, taskID: string }>) => {
         const tasks = state[action.payload.todoID]
         const index = tasks.findIndex(t => t.id === action.payload.taskID)
         tasks.splice(index, 1)
      },
      updateTask: (state, action: PayloadAction<{ todoID: string, taskID: string, model: UpdateTaskModelType }>) => {
         const tasks = state[action.payload.todoID]
         const index = tasks.findIndex(t => t.id === action.payload.taskID)
         tasks[index] = {...tasks[index], ...action.payload.model}
      },
      setTasks: (state, action: PayloadAction<{ todoID: string, tasks: TaskAPIType[] }>) => {
         state[action.payload.todoID] = action.payload.tasks
      },
   },
   extraReducers: builder => {
      builder.addCase(setTodos, (state, action) => {
         action.payload.todos.forEach(todo => {
            state[todo.id] = []
         })
      })
      builder.addCase(addTodo, (state, action) => {
         state[action.payload.todo.id] = []
      })
      builder.addCase(removeTodo, (state, action) => {
         delete state[action.payload.todoID]
      })
   },
})

export const taskReducer = slice.reducer

// actions =============================================================================================================

export const {
   addTask,
   removeTask,
   updateTask,
   setTasks,
} = {...slice.actions}

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
               dispatch(setTasks({todoID, tasks: res.data.items}))
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
               dispatch(addTask({task: res.data.data.item}))
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
               dispatch(removeTask({todoID, taskID}))
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
               dispatch(updateTask({todoID, taskID, model}))
               dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
               handleServerAppError(res.data, dispatch)
            }
         })
         .catch(error => {
            handleServerAppError(error, dispatch)
         })
   }
