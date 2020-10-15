import {TasksStateType} from './taskType'
import {taskReducer, addTaskTC, removeTaskTC, updateTaskTC, fetchTasksTC} from './taskReducer'
import {todolistReducer, removeTodoTC, addTodoTC, fetchTodo} from '../todolist/todolistReducer'
import {TaskStatuses, TodoTaskPriority} from '../../api/apiType'
import {TodolistType} from '../todolist/todolistsType'

let initialState: TasksStateType
let endState: TasksStateType
beforeEach(() => {
   initialState = {
      ['1']: [
         {
            id: '11',
            title: 'task 1',
            status: TaskStatuses.Completed,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
         {
            id: '12',
            title: 'task 2',
            status: TaskStatuses.Completed,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
         {
            id: '13',
            title: 'task 3',
            status: TaskStatuses.Completed,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
      ],
      ['2']: [
         {
            id: '21',
            title: 'task 1',
            status: TaskStatuses.InProgress,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
         {
            id: '22',
            title: 'task 2',
            status: TaskStatuses.InProgress,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
         {
            id: '23',
            title: 'task 3',
            status: TaskStatuses.InProgress,
            todoListId: '1',
            order: 0,
            addedDate: '',
            startDate: '',
            deadline: '',
            description: '',
            priority: TodoTaskPriority.Low,
         },
      ],
   }
})

test('new task should be added', () => {
   const newTask = {
      id: 'new',
      title: 'new',
      status: TaskStatuses.New,
      todoListId: '1',
      order: 0,
      addedDate: '',
      startDate: '',
      deadline: '',
      description: '',
      priority: TodoTaskPriority.Low,
   }
   const param = {task: newTask}
   // @ts-ignore
   let action = addTaskTC.fulfilled(param, 'requestId', param)

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(4)
   expect(endState['1'][0].id).toBeDefined()
   expect(endState['1'][0].title).toBe('new')
   expect(endState['1'][0].status).toBe(TaskStatuses.New)
   expect(endState['1'][1].id).toBe(initialState['1'][0].id)
   expect(endState['1'][2].id).toBe(initialState['1'][1].id)
})

test('task should be remove', () => {
   const param = {todoID: '2', taskID: '22'}
   let action = removeTaskTC.fulfilled(param, 'requestId', param)

   endState = taskReducer(initialState, action)

   expect(endState['2'].length).toBe(2)
   expect(endState['1'].length).toBe(3)
   expect(endState['2'].every(t => t.id !== '22')).toBeTruthy()
   expect(endState['2'][0].id).toBe('21')
   expect(endState['2'][1].id).toBe('23')
})

test('correct task should change its status', () => {
   const updateModel = {todoID: '1', taskID: '13', model: {...initialState['1'][2], status: TaskStatuses.Draft}}
   // @ts-ignore
   let action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(3)
   expect(endState['2'].length).toBe(3)
   expect(endState['1'][2].status).toBe(TaskStatuses.Draft)
   expect(endState['1'][2].title).toBe(initialState['1'][2].title)
})

test('correct task should change its title', () => {
   const updateModel = {todoID: '2', taskID: '21', model: {...initialState['2'][0], title: 'change'}}
   // @ts-ignore
   let action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)

   endState = taskReducer(initialState, action)

   expect(endState['1'].length).toBe(3)
   expect(endState['2'].length).toBe(3)
   expect(endState['2'][0].title).toBe('change')
   expect(endState['2'][0].status).toBe(initialState['2'][0].status)
   expect(endState['2'][0].id).toBe(initialState['2'][0].id)
})

test('property with todolistId should be deleted', () => {
   let action = removeTodoTC.fulfilled({todoID: '1'}, 'requestId', {todoID: '1'})

   endState = taskReducer(initialState, action)

   const keys = Object.keys(endState)
   expect(keys.length).toBe(1)
   expect(endState['1']).not.toBeDefined()
})

test('ids should be equals', () => {
   const startTodoState: TodolistType[] = []
   const startTaskState: TasksStateType = {}
   const newTodo = {id: '1', title: 'new', order: 0, addedDate: ''}
   // @ts-ignore
   const action = addTodoTC.fulfilled({todo: newTodo}, 'requestId', {todo: newTodo})

   const endTodoState = todolistReducer(startTodoState, action)
   const endTaskState = taskReducer(startTaskState, action)

   const keys = Object.keys(endTaskState)
   const idFromTasks = keys[0]
   const idFromTodo = endTodoState[0].id

   expect(idFromTasks).toBeDefined()
   expect(idFromTodo).toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
   const todos = [
      {id: '1', title: 'title 1', order: 0, addedDate: ''},
      {id: '2', title: 'title 2', order: 0, addedDate: ''},
   ]
   // @ts-ignore
   const action = fetchTodo.fulfilled({todos}, 'requestId', {todos})

   const endState = taskReducer({}, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(2)
   expect(endState['1']).toBeDefined()
   expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
   const action = fetchTasksTC.fulfilled({todoID: '1', tasks: initialState['1']}, 'requestId', '1')

   const endState = taskReducer({
      '2': [],
      '1': [],
   }, action)

   expect(endState['1'].length).toBe(3)
   expect(endState['2'].length).toBe(0)
})
