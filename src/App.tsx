import React, {useCallback} from 'react';
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

   const addTodo = useCallback(
      (title: string) => {
         dispatch(todoACs.addTodoAC(title))
      },
      [dispatch],
   )

   const removeTodo = useCallback(
      (todoID: string) => {
         dispatch(todoACs.removeTodoAC(todoID))
      },
      [dispatch],
   )

   const changeTodoTitle = useCallback(
      (todoID: string, value: string) => {
         dispatch(todoACs.changeTitleTodoAC(todoID, value))
      },
      [dispatch],
   )

   const changeFilter = useCallback(
      (todoID: string, value: FilterType) => {
         dispatch(todoACs.changeFilterTodoAC(todoID, value))
      },
      [dispatch],
   )

   const addTask = useCallback(
      (todoID: string, title: string) => {
         dispatch(taskACs.addTaskAC(todoID, title))
      },
      [dispatch],
   )

   const removeTask = useCallback(
      (todoID: string, taskID: string) => {
         dispatch(taskACs.removeTaskAC(todoID, taskID))
      },
      [dispatch],
   )

   const changeTaskStatus = useCallback(
      (todoID: string, taskID: string, value: boolean) => {
         dispatch(taskACs.changeStatusTaskAC(todoID, taskID, value))
      },
      [dispatch],
   )

   const changeTaskTitle = useCallback(
      (todoID: string, taskID: string, value: string) => {
         dispatch(taskACs.changeTitleTaskAC(todoID, taskID, value))
      },
      [dispatch],
   )

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
                     return <Grid item key={todo.id}>
                        <Todolist todoID={todo.id}
                                  title={todo.title}
                                  filter={todo.filter}
                                  tasks={tasks[todo.id]}
                                  removeTodo={removeTodo}
                                  changeTodoTitle={changeTodoTitle}
                                  addTask={addTask}
                                  changeFilter={changeFilter}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTask={removeTask}
                                  changeTaskTitle={changeTaskTitle}/>
                     </Grid>
                  })
               }
            </Grid>
         </Container>

      </div>
   );
}

export default App;
