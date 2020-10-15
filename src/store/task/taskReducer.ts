import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {UpdateTaskModelType} from '../../api/apiType'
import {AppRootStateType} from '../store'
import {setAppError, setAppStatus} from '../app/appReducer'
import {fetchTodo, addTodoTC, removeTodoTC} from '../todolist/todolistReducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {TasksStateType, TasksType, UpdateDomainTaskModelType} from './taskType'
import {taskAPI} from '../../api/api'

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
   async (todoID: string, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await taskAPI.getTasks(todoID)
         if (!res.data.error) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoID, tasks: res.data.items}
         } else {
            thunkAPI.dispatch(setAppError({error: 'Oops, some error occured'}))
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }

   })

export const addTaskTC = createAsyncThunk('tasks/addTask',
   async (param: { todoID: string, title: string }, thunkAPI) => {
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await taskAPI.createTask(param.todoID, param.title)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {task: res.data.data.item}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

export const removeTaskTC = createAsyncThunk('tasks/removeTask',
   async (param: { todoID: string, taskID: string }, thunkAPI) => {
      const {todoID, taskID} = param
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await taskAPI.deleteTask(todoID, taskID)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoID, taskID}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

export const updateTaskTC = createAsyncThunk('tasks/updateTask',
   async (param: { todoID: string, taskID: string, changingValue: UpdateDomainTaskModelType }, thunkAPI) => {
      const {todoID, taskID, changingValue} = param
      const state = thunkAPI.getState() as AppRootStateType
      const task = state.tasks[todoID].find(t => t.id === taskID)
      if (!task) {
         console.warn('task not found in the state')
         return thunkAPI.rejectWithValue(null)
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
      thunkAPI.dispatch(setAppStatus({status: 'loading'}))
      try {
         const res = await taskAPI.updateTask(todoID, taskID, model)
         if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoID, taskID, model}
         } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
         }
      } catch (error) {
         handleServerNetworkError(error, thunkAPI.dispatch)
         return thunkAPI.rejectWithValue(null)
      }
   })

const initialState = {} as TasksStateType

const slice = createSlice({
   name: 'tasks',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(fetchTodo.fulfilled, (state, action) => {
         action.payload.todos.forEach(todo => {
            state[todo.id] = []
         })
      })
      builder.addCase(addTodoTC.fulfilled, (state, action) => {
         state[action.payload.todo.id] = []
      })
      builder.addCase(removeTodoTC.fulfilled, (state, action) => {
         delete state[action.payload.todoID]
      })
      builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
         state[action.payload.todoID] = action.payload.tasks
      })
      builder.addCase(addTaskTC.fulfilled, (state, action) => {
         const newTask: TasksType = action.payload.task
         return {
            ...state,
            [action.payload.task.todoListId]: [newTask, ...state[action.payload.task.todoListId]],
         }
      })
      builder.addCase(removeTaskTC.fulfilled, (state, action) => {
         const tasks = state[action.payload.todoID]
         const index = tasks.findIndex(t => t.id === action.payload.taskID)
         tasks.splice(index, 1)
      })
      builder.addCase(updateTaskTC.fulfilled, (state, action) => {
         const tasks = state[action.payload.todoID]
         const index = tasks.findIndex(t => t.id === action.payload.taskID)
         tasks[index] = {...tasks[index], ...action.payload.model}
      })
   },
})

export const taskReducer = slice.reducer
