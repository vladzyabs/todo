import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {FilterType, TodolistType, TasksType} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemFrom from './components/ AddItemForm/AddItemForm';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {todolistReducer} from './store/todolist/todolistReducer';
import * as todoACs from './store/todolist/todolistAction';
import * as taskACs from './store/task/taskAction';
import {taskReducer} from './store/task/taskReducer';

type TodoTasksType = {
   [key: string]: TasksType[]
}

function AppWithReducer() {

   const todoID1 = v1()
   const todoID2 = v1()

   const [todolists, dispatchToTodo] = useReducer(todolistReducer, [
      {id: todoID1, title: 'todolist 1123', filter: 'all'},
      {id: todoID2, title: 'todolist 2', filter: 'all'},
   ])

   const [tasks, dispatchToTask] = useReducer(taskReducer, {
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
      const action = todoACs.addTodoAC(title)
      dispatchToTodo(action)
      dispatchToTask(action)
   }

   const removeTodo = (todoID: string) => {
      dispatchToTodo(todoACs.removeTodoAC(todoID))
      dispatchToTask(todoACs.removeTodoAC(todoID))
   }

   const changeTodoTitle = (todoID: string, value: string) => {
      dispatchToTodo(todoACs.changeTitleTodoAC(todoID, value))
   }

   const changeFilter = (todoID: string, value: FilterType) => {
      dispatchToTodo(todoACs.changeFilterTodoAC(todoID, value))
   }

   const addTask = (todoID: string, title: string) => {
      dispatchToTask(taskACs.addTaskAC(todoID, title))
   }

   const removeTask = (todoID: string, taskID: string) => {
      dispatchToTask(taskACs.removeTaskAC(todoID, taskID))
   }

   const changeTaskStatus = (todoID: string, taskID: string, value: boolean) => {
      dispatchToTask(taskACs.changeStatusTaskAC(todoID, taskID, value))
   }

   const changeTaskTitle = (todoID: string, taskID: string, value: string) => {
      dispatchToTask(taskACs.changeTitleTaskAC(todoID, taskID, value))
   }

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuOutlinedIcon/>
               </IconButton>
               <Typography variant="h6">
                  Todo
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>

         <Container fixed>
            <Grid container style={{padding: '10px'}}>
               <AddItemFrom addItem={addTodo}/>
            </Grid>
            <Grid container spacing={3}>
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

                     return <Grid item key={todo.id}>
                        <Todolist todoID={todo.id}
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
                     </Grid>
                  })
               }
            </Grid>
         </Container>

      </div>
   );
}

export default AppWithReducer;
