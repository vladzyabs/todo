import React, {useCallback} from 'react';
import AddItemFrom from '../ AddItemForm/AddItemForm';
import EditableSpan from '../common/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import styles from './Todolist.module.scss';
import {TasksType} from '../../store/task/taskType';
import {FilterType} from '../../store/todolist/todolistsType';
import Task from '../Task/Task';

type TodolistPropsType = {
   todoID: string
   title: string
   filter: FilterType
   tasks: TasksType[]
   removeTodo: (todoID: string) => void
   changeTodoTitle: (todoID: string, value: string) => void
   changeFilter: (todoID: string, filter: FilterType) => void
   addTask: (todoID: string, title: string) => void
   removeTask: (todoID: string, tasksID: string) => void
   changeTaskStatus: (todoID: string, taskID: string, value: boolean) => void
   changeTaskTitle: (todoID: string, taskID: string, value: string) => void
}

const Todolist = React.memo(
   (props: TodolistPropsType) => {
      console.log('render todo')
      const {todoID, addTask, filter, changeFilter, removeTodo, changeTodoTitle} = props

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

      let filterTasks
      switch (filter) {
         case 'active':
            filterTasks = props.tasks.filter(t => !t.isDone)
            break
         case 'completed':
            filterTasks = props.tasks.filter(t => t.isDone)
            break
         default:
            filterTasks = props.tasks
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
