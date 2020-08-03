import {TasksStateType} from './taskType'
import * as actions from './taskAction'
import {taskReducer} from './taskReducer';
import {addTodoAC, removeTodoAC} from '../todolist/todolistAction';
import {todolistReducer} from '../todolist/todolistReducer';
import {TodolistType} from '../todolist/todolistsType';

let initialState: TasksStateType
let endState: TasksStateType
beforeEach(() => {
   initialState = {
      ['1']: [
         {id: '11', title: 'task 1', isDone: true},
         {id: '12', title: 'task 2', isDone: true},
         {id: '13', title: 'task 3', isDone: true},
      ],
      ['2']: [
         {id: '21', title: 'task 1', isDone: false},
         {id: '22', title: 'task 2', isDone: false},
         {id: '23', title: 'task 3', isDone: false},
      ],
   }
})

test('new task should be added', () => {
   let action = actions.addTaskAC('1', 'new task')

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(4)
   expect(endState['1'][0].id).toBeDefined()
   expect(endState['1'][0].title).toBe('new task')
   expect(endState['1'][0].isDone).toBe(false)
   expect(endState['1'][1].id).toBe(initialState['1'][0].id)
   expect(endState['1'][2].id).toBe(initialState['1'][1].id)
})

test('task should be remove', () => {
   let action = actions.removeTaskAC('2', '22')

   endState = taskReducer(initialState, action)

   expect(endState['2'].length).toBe(2)
   expect(endState['1'].length).toBe(3)
   expect(endState['2'].every(t => t.id !== '22')).toBeTruthy()
   expect(endState['2'][0].id).toBe('21')
   expect(endState['2'][1].id).toBe('23')
})

test('correct task should change its status', () => {
   let action = actions.changeStatusTaskAC('1', '13', false)

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(3)
   expect(endState['2'].length).toBe(3)
   expect(endState['1'][2].isDone).toBe(false)
   expect(endState['1'][2].title).toBe(initialState['1'][2].title)
})

test('correct task should change its title', () => {
   let action = actions.changeTitleTaskAC('2', '21', 'change')

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(3)
   expect(endState['2'].length).toBe(3)
   expect(endState['2'][0].title).toBe('change')
   expect(endState['2'][0].isDone).toBe(initialState['2'][0].isDone)
   expect(endState['2'][0].id).toBe(initialState['2'][0].id)
})

test('property with todolistId should be deleted', () => {
   let action = removeTodoAC('1')

   endState = taskReducer(initialState, action)

   const keys = Object.keys(endState)
   expect(keys.length).toBe(1)
   expect(endState['1']).not.toBeDefined()
})

test ('ids should be equals', () => {
   const startTodoState: TodolistType[] = []
   const startTaskState: TasksStateType = {}
   const action = addTodoAC('new todo')

   const endTodoState = todolistReducer(startTodoState, action)
   const endTaskState = taskReducer(startTaskState, action)

   const keys = Object.keys(endTaskState)
   const idFromTasks = keys[0]
   const idFromTodo = endTodoState[0].id

   expect(idFromTasks).toBe(action.todoID)
   expect(idFromTodo).toBe(action.todoID)
})
