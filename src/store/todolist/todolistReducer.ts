import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EntityStatusType, FilterType, TodolistType} from './todolistsType'
import {fetchTodo, addTodoTC, removeTodoTC, updateTodoTitleTC} from './todolistThunks'

const initialState = [] as TodolistType[]

const slice = createSlice({
   name: 'todo',
   initialState,
   reducers: {
      changeFilterTodo: (state, action: PayloadAction<{ todoID: string, filter: FilterType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].filter = action.payload.filter
      },
      setTodoEntityStatus: (state, action: PayloadAction<{ todoID: string, status: EntityStatusType }>) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].entityStatus = action.payload.status
      },
   },
   extraReducers: builder => {
      builder.addCase(fetchTodo.fulfilled, (state, action) => {
         return action.payload.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
      })
      builder.addCase(addTodoTC.fulfilled, (state, action) => {
         return [
            {...action.payload.todo, filter: 'all', entityStatus: 'idle'},
            ...state,
         ]
      })
      builder.addCase(removeTodoTC.fulfilled, (state, action) => {
         return state.filter(t => t.id !== action.payload.todoID)
      })
      builder.addCase(updateTodoTitleTC.fulfilled, (state, action) => {
         const index = state.findIndex(todo => todo.id === action.payload.todoID)
         state[index].title = action.payload.title
      })
   },
})

export const todolistReducer = slice.reducer

// actions =============================================================================================================

export const {
   changeFilterTodo,
   setTodoEntityStatus,
} = {...slice.actions}
