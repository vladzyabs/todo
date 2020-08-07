import React, {useCallback} from 'react';
import AddItemFrom from '../ AddItemForm/AddItemForm';
import EditableSpan from '../common/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import styles from './Todolist.module.scss';
import {TasksStateType} from '../../store/task/taskType';
import {FilterType} from '../../store/todolist/todolistsType';
import Task from '../Task/Task';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import * as taskACs from '../../store/task/taskAction';

type TodolistPropsType = {
   todoID: string
   title: string
   filter: FilterType
   removeTodo: (todoID: string) => void
   changeTodoTitle: (todoID: string, value: string) => void
   addTask: (todoID: string, title: string) => void
   changeFilter: (todoID: string, filter: FilterType) => void
}

const Todolist = React.memo(
   (props: TodolistPropsType) => {
      console.log('render todo')
      const {todoID, addTask, filter, changeFilter, removeTodo, changeTodoTitle} = props

      const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)
      const dispatch = useDispatch()

      //action for task ----------------------------------------------------

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

      // ----------------------------------------------------------------------

      const addTaskCallback = useCallback(
         (title: string) => {
            addTask(todoID, title)
         },
         [todoID, addTask],
      )

      const onClickFilter = useCallback(
         (FilterValue: FilterType) => {
            changeFilter(todoID, FilterValue)
         },
         [todoID, changeFilter],
      )

      const removeTodoCallback = useCallback(
         () => removeTodo(todoID),
         [todoID, removeTodo],
      )

      const onChangeTodoTitle = useCallback(
         (value: string) => {
            changeTodoTitle(todoID, value)
         },
         [todoID, changeTodoTitle],
      )

      const filterBtnVariant = useCallback(
         (filterValue: FilterType) => {
            return filter === filterValue ? 'contained' : 'outlined'
         },
         [filter],
      )

      let filterTasks = tasks[props.todoID]
      switch (filter) {
         case 'active':
            filterTasks = tasks[props.todoID].filter(t => !t.isDone)
            break
         case 'completed':
            filterTasks = tasks[props.todoID].filter(t => t.isDone)
            break
         default:
            filterTasks = tasks[props.todoID]
      }

      return (
         <Paper elevation={3} variant="outlined" className={styles.todo}>
            <h3><EditableSpan value={props.title} changeValue={onChangeTodoTitle}/>
               <IconButton aria-label="delete" onClick={removeTodoCallback}>
                  <DeleteIcon color="action"/>
               </IconButton>
            </h3>
            <div>
               <AddItemFrom addItem={addTaskCallback}/>
            </div>
            {
               filterTasks.map(t => {
                  return <Task key={t.id} todoID={props.todoID}
                               task={t}
                               removeTask={removeTask}
                               changeTaskStatus={changeTaskStatus}
                               changeTaskTitle={changeTaskTitle}/>
               })
            }
            <div>
               <ButtonGroup color="primary" aria-label="filter button group" className={styles.btnGroup}>
                  <Button onClick={() => onClickFilter('all')}
                          variant={filterBtnVariant('all')}>All</Button>
                  <Button onClick={() => onClickFilter('active')}
                          variant={filterBtnVariant('active')}>Active</Button>
                  <Button onClick={() => onClickFilter('completed')}
                          variant={filterBtnVariant('completed')}>Completed</Button>
               </ButtonGroup>
            </div>
         </Paper>
      )
   },
)

export default Todolist
