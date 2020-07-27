import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TodolistType, TasksType} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemFrom from './components/ AddItemForm/AddItemForm';

type TodoTasksType = {
   [key: string]: TasksType[]
}

function App() {

   const todoID1 = v1()
   const todoID2 = v1()
   const [todolists, setTodolists] = useState<TodolistType[]>([
      {id: todoID1, title: 'todolist 1', filter: 'all'},
      {id: todoID2, title: 'todolist 2', filter: 'all'},
   ])
   const [tasks, setTasks] = useState<TodoTasksType>({
      [todoID1]: [
         {id: v1(), title: 'task 1', isDone: true},
         {id: v1(), title: 'task 2', isDone: false},
         {id: v1(), title: 'task 3', isDone: true},
      ],
      [todoID2]: [
         {id: v1(), title: 'task 1', isDone: true},
         {id: v1(), title: 'task 2', isDone: false},
         {id: v1(), title: 'task 3', isDone: true},
      ],
   })

   const addTodo = (title: string) => {
      const newTodoId = v1()
      const newTodo: TodolistType = {id: newTodoId, title: title, filter: 'all'}
      setTodolists([newTodo, ...todolists])
      setTasks({...tasks, [newTodoId]: []})
   }

   const removeTodo = (todoID: string) => {
      setTodolists(prevState => prevState.filter(todo => todo.id !== todoID))
   }

   const changeTodoTitle = (todoID: string, value: string) => {
      const todolist = todolists.find(todo => todo.id === todoID)
      if (todolist) {
         todolist.title = value
         setTodolists([...todolists])
      }
   }

   const addTask = (todoID: string, title: string) => {
      const newTask = {id: v1(), title: title.trim(), isDone: false}
      tasks[todoID] = [newTask, ...tasks[todoID]]
      setTasks({...tasks})
   }

   const removeTask = (todoID: string, taskID: string) => {
      tasks[todoID] = tasks[todoID].filter(t => t.id !== taskID)
      setTasks({...tasks})
   }

   const changeTaskStatus = (todoID: string, taskID: string, value: boolean) => {
      const task = tasks[todoID].find(t => t.id === taskID)
      if (task) {
         task.isDone = value
         setTasks({...tasks})
      }
   }

   const changeTaskTitle = (todoID: string, taskID: string, value: string) => {
      const task = tasks[todoID].find(t => t.id === taskID)
      if (task) {
         task.title = value
         setTasks({...tasks})
      }
   }

   const changeFilter = (todoID: string, value: FilterType) => {
      const todolist = todolists.find(todo => todo.id === todoID)
      if (todolist) {
         todolist.filter = value
         setTodolists(prevState => [...prevState])
      }
   }

   return (
      <div className="App">
         <AddItemFrom addItem={addTodo}/>
         {
            todolists.map(todo => {
               let filterTasks
               switch (todo.filter) {
                  case 'active':
                     filterTasks = tasks[todo.id].filter(t => !t.isDone)
                     break
                  case 'completed':
                     filterTasks = tasks[todo.id].filter(t => t.isDone)
                     break
                  default:
                     filterTasks = tasks[todo.id]
               }

               return <Todolist key={todo.id}
                                todoID={todo.id}
                                title={todo.title}
                                tasks={filterTasks}
                                filter={todo.filter}
                                removeTodo={removeTodo}
                                changeTodoTitle={changeTodoTitle}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeFilter={changeFilter}/>
            })
         }
      </div>
   );
}

export default App;
