import React, {useCallback, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import AddItemFrom from '../../components/ AddItemForm/AddItemForm'
import Todolist from '../../components/Todolist/Todolist'
import {
   addTodoTC,
   changeFilterTodoAC,
   getTodosTC,
   removeTodoTC,
   updateTodoTitleTC,
} from '../../store/todolist/todolistAction'
import {FilterType, TodolistType} from '../../store/todolist/todolistsType'
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../store/task/taskAction'
import {TaskStatuses} from '../../api/apiType'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {TasksStateType} from '../../store/task/taskType'

const TodolistsPage: React.FC = () => {
   const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todos)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

   const dispatch = useDispatch()

   useEffect(
      () => {
         dispatch(getTodosTC)
      }, []
   )

   const addTodo = useCallback(
      (title: string) => dispatch(addTodoTC(title)),
      [dispatch],
   )

   const removeTodo = useCallback(
      (todoID: string) => dispatch(removeTodoTC(todoID)),
      [dispatch],
   )

   const changeTodoTitle = useCallback(
      (todoID: string, value: string) => dispatch(updateTodoTitleTC(todoID, value)),
      [dispatch],
   )

   const changeFilter = useCallback(
      (todoID: string, value: FilterType) => dispatch(changeFilterTodoAC(todoID, value)),
      [dispatch],
   )

   const addTask = useCallback(
      (todoID: string, title: string) => dispatch(addTaskTC(todoID, title)),
      [dispatch],
   )

   const removeTask = useCallback(
      (todoID: string, taskID: string) => dispatch(removeTaskTC(todoID, taskID)),
      [dispatch],
   )

   const changeTaskStatus = useCallback(
      (todoID: string, taskID: string, value: TaskStatuses) =>
         dispatch(updateTaskTC(todoID, taskID, {status: value})),
      [dispatch],
   )

   const changeTaskTitle = useCallback(
      (todoID: string, taskID: string, value: string) =>
         dispatch(updateTaskTC(todoID, taskID, {title: value})),
      [dispatch],
   )

   if(!isLoggedIn) {
      return <Redirect to={'/login'}/>
   }

   return (
      <>
         <Grid container style={{padding: '10px'}}>
            <AddItemFrom addItem={addTodo}/>
         </Grid>
         <Grid container spacing={3}>
            {
               todolists.map(todo => {
                  let allTodolistTasks = tasks[todo.id]
                  return <Grid item key={todo.id}>
                     <Todolist todoID={todo.id}
                               entityStatus={todo.entityStatus}
                               title={todo.title}
                               filter={todo.filter}
                               tasks={allTodolistTasks}
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
      </>
   )
}

export default TodolistsPage
