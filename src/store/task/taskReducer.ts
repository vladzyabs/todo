import {createSlice} from '@reduxjs/toolkit'
import {fetchTodo, addTodoTC, removeTodoTC} from '../todolist/todolistThunks'
import {fetchTasksTC, addTaskTC, removeTaskTC, updateTaskTC} from './taskThunks'
import {TasksStateType, TasksType} from './taskType'

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
