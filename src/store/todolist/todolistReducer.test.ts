import {TodolistType} from './todolistsType'
import {todolistReducer, addTodoTC, removeTodoTC, updateTodoTitleTC, changeFilterTodo, fetchTodo} from './todolistReducer'

let initialState: TodolistType[]
let endState: TodolistType[]
beforeEach(() => {
   initialState = [
      {id: '1', title: 'todo 1', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
      {id: '2', title: 'todo 2', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
      {id: '3', title: 'todo 3', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
   ]
   endState = []
})

test('new todo should be added', () => {
   const newTodo = {id: 'new', title: 'new', order: 0, addedDate: 'now'}
   // @ts-ignore
   let action = addTodoTC.fulfilled({todo: newTodo}, 'requestId', {todo: newTodo})

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(4)
   expect(endState[0].id).toBeDefined()
   expect(endState[0].title).toBe('new')
   expect(endState[0].filter).toBe('all')
})

test('correct todo should be removed', () => {
   let action = removeTodoTC.fulfilled({todoID: '1'}, 'requestId', {todoID: '1'})

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(2)
   expect(endState.find(t => t.id === '1')).toBeUndefined()
})

test('correct todo should change its title', () => {
   let action = updateTodoTitleTC.fulfilled({todoID: '2', title: 'change'}, 'requestId', {todoID: '2', title: 'change'})

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(3)
   expect(endState[1].title).toBe('change')
   expect(endState[1].filter).toBe(initialState[1].filter)
   expect(endState[0].title).toBe(initialState[0].title)
   expect(endState[2].title).toBe(initialState[2].title)
})

test('correct todo should change its filter', () => {
   let action = changeFilterTodo({todoID: '3', filter: 'completed'})

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(3)
   expect(endState[0].filter).toBe(initialState[0].filter)
   expect(endState[1].filter).toBe(initialState[1].filter)
   expect(endState[2].filter).toBe('completed')
})

test('todolists should be added', () => {
   const todos = [
      {id: '1', title: 'title 1', order: 0, addedDate: ''},
      {id: '2', title: 'title 2', order: 0, addedDate: ''},
   ]
   // @ts-ignore
   const action = fetchTodo.fulfilled({todos}, 'requestId', {todos})

   const endState = todolistReducer([], action)

   expect(endState.length).toBe(2)
})
