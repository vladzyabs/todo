import React, {ChangeEvent, useCallback} from 'react'
import {TasksType} from '../../store/task/taskType'
import styles from './Task.module.scss'
import {Checkbox} from '@material-ui/core'
import EditableSpan from '../common/EditableSpan/EditableSpan'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {TaskStatuses} from '../../api/apiType'

type TaskPropsType = {
   todoID: string
   task: TasksType
   removeTask: (todoID: string, tasksID: string) => void
   changeTaskStatus: (todoID: string, taskID: string, value: TaskStatuses) => void
   changeTaskTitle: (todoID: string, taskID: string, value: string) => void
}

const Task = React.memo(
   (props: TaskPropsType) => {

      const {todoID, task, removeTask, changeTaskStatus, changeTaskTitle} = props

      const onChangeHandler = useCallback(
         (e: ChangeEvent<HTMLInputElement>) => {
            const status: TaskStatuses = (e.currentTarget.checked) ? TaskStatuses.Completed : TaskStatuses.New
            changeTaskStatus(todoID, task.id, status)
         },
         [todoID, task.id, changeTaskStatus],
      )

      const onClickHandler = useCallback(
         () => removeTask(todoID, task.id),
         [todoID, task.id, removeTask],
      )

      const onChangeTitle = useCallback(
         (title: string) => changeTaskTitle(todoID, task.id, title),
         [todoID, task.id, changeTaskTitle],
      )

      return <div className={styles.task}>
         <Checkbox
            color="primary"
            checked={task.status === TaskStatuses.Completed} onChange={onChangeHandler}
         />
         <EditableSpan value={task.title} changeValue={onChangeTitle}/>
         <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon color="action"/>
         </IconButton>
      </div>
   },
)

export default Task
