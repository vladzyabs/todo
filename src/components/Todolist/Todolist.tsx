import React, {ChangeEvent} from 'react';
import AddItemFrom from '../ AddItemForm/AddItemForm';
import EditableSpan from '../common/EditableSpan/EditableSpan';

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

   const filterBtnClasses = (filterValue: FilterType) => {
      return props.filter === filterValue ? 'active-filter' : ''
   }

   const removeTodo = () => props.removeTodo(props.todoID)

   const onChangeTodoTitle = (value: string) => {
      props.changeTodoTitle(props.todoID, value)
   }

   return (
      <div>
         <h3><EditableSpan value={props.title} changeValue={onChangeTodoTitle}/>
         <button onClick={removeTodo}>X</button></h3>
         <div>
            <AddItemFrom addItem={addTask}/>
         </div>
         <ul>
            {
               props.tasks.map(t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                     props.changeTaskStatus(props.todoID, t.id, e.currentTarget.checked)

                  const onClickHandler = () => props.removeTask(props.todoID, t.id)

                  const onChangeTitle = (title: string) => props.changeTaskTitle(props.todoID, t.id, title)

                  return <li key={t.id}>
                     <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                     <EditableSpan value={t.title} changeValue={onChangeTitle}/>
                     {/*<span className={t.isDone && props.filter !== 'completed' ? 'task-is-done' : ''}>{t.title}</span>*/}
                     <button onClick={onClickHandler}>remove</button>
                  </li>
               })
            }
         </ul>
         <div>
            <button onClick={() => onClickFilter('all')}
                    className={filterBtnClasses('all')}>All</button>
            <button onClick={() => onClickFilter('active')}
                    className={filterBtnClasses('active')}>Active</button>
            <button onClick={() => onClickFilter('completed')}
                    className={filterBtnClasses('completed')}>Completed</button>
         </div>
      </div>
   )
}

export default Todolist
