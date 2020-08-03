import React from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import AddItemFrom from './components/ AddItemForm/AddItemForm';
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import * as todoACs from './store/todolist/todolistAction';
import * as taskACs from './store/task/taskAction';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';
import {FilterType, TodolistType} from './store/todolist/todolistsType';
import {TasksStateType} from './store/task/taskType';

function App() {

   const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todo)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)
   const dispatch = useDispatch()

   const addTodo = (title: string) => {
      dispatch(todoACs.addTodoAC(title))
   }

   const removeTodo = (todoID: string) => {
      dispatch(todoACs.removeTodoAC(todoID))
   }

   const changeTodoTitle = (todoID: string, value: string) => {
      dispatch(todoACs.changeTitleTodoAC(todoID, value))
   }

   const changeFilter = (todoID: string, value: FilterType) => {
      dispatch(todoACs.changeFilterTodoAC(todoID, value))
   }

   const addTask = (todoID: string, title: string) => {
      dispatch(taskACs.addTaskAC(todoID, title))
   }

   const removeTask = (todoID: string, taskID: string) => {
      dispatch(taskACs.removeTaskAC(todoID, taskID))
   }

   const changeTaskStatus = (todoID: string, taskID: string, value: boolean) => {
      dispatch(taskACs.changeStatusTaskAC(todoID, taskID, value))
   }

   const changeTaskTitle = (todoID: string, taskID: string, value: string) => {
      dispatch(taskACs.changeTitleTaskAC(todoID, taskID, value))
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

export default App;
