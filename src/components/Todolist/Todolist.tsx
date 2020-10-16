import React, {useCallback, useEffect} from 'react'
import AddItemFrom from '../ AddItemForm/AddItemForm'
import EditableSpan from '../common/EditableSpan/EditableSpan'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Paper from '@material-ui/core/Paper'
import styles from './Todolist.module.scss'
import {TasksType} from '../../store/task/taskType'
import {EntityStatusType, FilterType} from '../../store/todolist/todolistsType'
import Task from '../Task/Task'
import {TaskStatuses} from '../../api/apiType'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../../store/task/taskThunks'

type TodolistPropsType = {
   todoID: string
   entityStatus: EntityStatusType
   title: string
   filter: FilterType
   tasks: TasksType[]
   removeTodo: (todoID: string) => void
   changeTodoTitle: (todoID: string, value: string) => void
   changeFilter: (todoID: string, filter: FilterType) => void
   addTask: (todoID: string, title: string) => void
   removeTask: (todoID: string, tasksID: string) => void
   changeTaskStatus: (todoID: string, taskID: string, value: TaskStatuses) => void
   changeTaskTitle: (todoID: string, taskID: string, value: string) => void
}

const Todolist = React.memo(
   (props: TodolistPropsType) => {

      const {todoID, addTask, filter, changeFilter, removeTodo, changeTodoTitle} = props
      const dispatch = useDispatch()

      useEffect(
         () => {
            dispatch(fetchTasksTC(todoID))
         }, []
      )

      const addTaskCallback = useCallback(
         (title: string) => addTask(todoID, title),
         [todoID, addTask],
      )

      const onClickFilter = useCallback(
         (FilterValue: FilterType) => changeFilter(todoID, FilterValue),
         [todoID, changeFilter],
      )

      const removeTodoCallback = useCallback(
         () => removeTodo(todoID),
         [todoID, removeTodo],
      )

      const onChangeTodoTitle = useCallback(
         (value: string) => changeTodoTitle(todoID, value),
         [todoID, changeTodoTitle],
      )

      const filterBtnVariant = useCallback(
         (filterValue: FilterType) => filter === filterValue ? 'contained' : 'outlined',
         [filter],
      )

      let filterTasks
      switch (filter) {
         case 'active':
            filterTasks = props.tasks.filter(t => t.status === TaskStatuses.New)
            break
         case 'completed':
            filterTasks = props.tasks.filter(t => t.status === TaskStatuses.Completed)
            break
         default:
            filterTasks = props.tasks
      }

      return (
         <Paper elevation={3} variant="outlined" className={styles.todo}>
            <h3>
               <EditableSpan value={props.title} changeValue={onChangeTodoTitle}/>
               <IconButton aria-label="delete" onClick={removeTodoCallback} disabled={props.entityStatus === 'loading'}>
                  <DeleteIcon color="action"/>
               </IconButton>
            </h3>
            <div>
               <AddItemFrom addItem={addTaskCallback} disabled={props.entityStatus === 'loading'}/>
            </div>
            {
               filterTasks.map(t => {
                  return <Task key={t.id} todoID={props.todoID}
                               task={t}
                               removeTask={props.removeTask}
                               changeTaskStatus={props.changeTaskStatus}
                               changeTaskTitle={props.changeTaskTitle}/>
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
