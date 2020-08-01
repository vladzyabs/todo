import {TodolistType} from './todolistsType';
import {todolistReducer} from './todolistReducer'
import * as actions from './todolistAction'

let initialState: TodolistType[]
let endState: TodolistType[]
beforeEach(() => {
   initialState = [
      {id: '1', title: 'todo 1', filter: 'all'},
      {id: '2', title: 'todo 2', filter: 'all'},
      {id: '3', title: 'todo 3', filter: 'all'},
   ]
   endState = []
})

test('new todo should be added', () => {
   let action = actions.addTodoAC('todo 4')

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(4)
   expect(endState[0].id).toBeDefined()
   expect(endState[0].title).toBe('todo 4')
   expect(endState[0].filter).toBe('all')
})

test('correct todo should be removed', () => {
   let action = actions.removeTodoAC('1')

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(2)
   expect(endState.find(t => t.id === '1')).toBeUndefined()
})

test('correct todo should change its title', () => {
   let action = actions.changeTitleTodoAC('2', 'change')

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(3)
   expect(endState[1].title).toBe('change')
   expect(endState[1].filter).toBe(initialState[1].filter)
   expect(endState[0].title).toBe(initialState[0].title)
   expect(endState[2].title).toBe(initialState[2].title)
})

test('correct todo should change its filter', () => {
   let action = actions.changeFilterTodoAC('3', 'completed')

   endState = todolistReducer(initialState, action)

   expect(endState.length).toBe(3)
   expect(endState[0].filter).toBe(initialState[0].filter)
   expect(endState[1].filter).toBe(initialState[1].filter)
   expect(endState[2].filter).toBe('completed')
})
