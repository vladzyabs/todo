import React, {ChangeEvent} from 'react';
import AddItemFrom from '../ AddItemForm/AddItemForm';
import EditableSpan from '../common/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Checkbox} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import styles from './Todolist.module.scss';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
   id: string
   title: string
   filter: FilterType
}

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}

type TodolistPropsType = {
   todoID: string
   title: string
   tasks: TasksType[]
   filter: FilterType
   removeTodo: (todoID: string) => void
   changeTodoTitle: (todoID: string, value: string) => void
   removeTask: (todoID: string, tasksID: string) => void
   addTask: (todoID: string, title: string) => void
   changeTaskStatus: (todoID: string, taskID: string, value: boolean) => void
   changeTaskTitle: (todoID: string, taskID: string, value: string) => void
   changeFilter: (todoID: string, filter: FilterType) => void
}

function Todolist(props: TodolistPropsType) {

   const addTask = (title: string) => {
      props.addTask(props.todoID, title)
   }

   const onClickFilter = (FilterValue: FilterType) => {
      props.changeFilter(props.todoID, FilterValue)
   }

   const filterBtnVariant = (filterValue: FilterType) => {
      return props.filter === filterValue ? 'contained' : 'outlined'
   }

   const removeTodo = () => props.removeTodo(props.todoID)

   const onChangeTodoTitle = (value: string) => {
      props.changeTodoTitle(props.todoID, value)
   }

   return (
      <Paper elevation={3} variant="outlined" className={styles.todo}>
         <h3><EditableSpan value={props.title} changeValue={onChangeTodoTitle}/>
            <IconButton aria-label="delete" onClick={removeTodo}>
               <DeleteIcon color="action"/>
            </IconButton>
         </h3>
         <div>
            <AddItemFrom addItem={addTask}/>
         </div>
            {
               props.tasks.map(t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                     props.changeTaskStatus(props.todoID, t.id, e.currentTarget.checked)

                  const onClickHandler = () => props.removeTask(props.todoID, t.id)

                  const onChangeTitle = (title: string) => props.changeTaskTitle(props.todoID, t.id, title)

                  return <div key={t.id} className={styles.task}>
                     <Checkbox
                        color="primary"
                        checked={t.isDone} onChange={onChangeHandler}
                     />
                     <EditableSpan value={t.title} changeValue={onChangeTitle}/>
                     <IconButton aria-label="delete" onClick={onClickHandler}>
                        <DeleteIcon color="action"/>
                     </IconButton>
                  </div>
               })
            }
         <div>
            <ButtonGroup color="primary" aria-label="filter button group">
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
}

export default Todolist
