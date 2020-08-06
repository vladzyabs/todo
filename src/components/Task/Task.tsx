import React, {ChangeEvent} from 'react';
import {TasksType} from '../../store/task/taskType';
import styles from '../Todolist/Todolist.module.scss';
import {Checkbox} from '@material-ui/core';
import EditableSpan from '../common/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

type TaskPropsType = {
   todoID: string
   task: TasksType
   removeTask: (todoID: string, tasksID: string) => void
   changeTaskStatus: (todoID: string, taskID: string, value: boolean) => void
   changeTaskTitle: (todoID: string, taskID: string, value: string) => void
}

function Task(props: TaskPropsType) {

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(props.todoID, props.task.id, e.currentTarget.checked)

   const onClickHandler = () => props.removeTask(props.todoID, props.task.id)

   const onChangeTitle = (title: string) => props.changeTaskTitle(props.todoID, props.task.id, title)

   return <div className={styles.task}>
      <Checkbox
         color="primary"
         checked={props.task.isDone} onChange={onChangeHandler}
      />
      <EditableSpan value={props.task.title} changeValue={onChangeTitle}/>
      <IconButton aria-label="delete" onClick={onClickHandler}>
         <DeleteIcon color="action"/>
      </IconButton>
   </div>
}

export default Task
