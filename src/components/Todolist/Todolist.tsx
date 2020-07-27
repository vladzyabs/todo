import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
   removeTask: (tasksID: string) => void
   addTask: (title: string) => void
   changeTaskStatus: (taskID: string, value: boolean) => void
   changeFilter: (filter: FilterType) => void
}

function Todolist(props: TodolistPropsType) {

   const [newTaskTitle, setNewTaskTitle] = useState<string>('')

   const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
   }

   const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addTask()
      }
   }

   const addTask = () => {
      if (newTaskTitle.trim()) {
         props.addTask(newTaskTitle)
      }
      setNewTaskTitle('')
   }

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input type="text" value={newTaskTitle} onChange={changeTaskTitle} onKeyPress={onEnter}/>
            <button onClick={addTask}>add</button>
         </div>
         <ul>
            {
               props.tasks.map(t => {
                  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                     props.changeTaskStatus(t.id, e.currentTarget.checked)

                  const onClickHandler = () => props.removeTask(t.id)

                  return <li key={t.id}>
                     <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                     <span>{t.title}</span>
                     <button onClick={onClickHandler}>remove</button>
                  </li>
               })
            }
         </ul>
         <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
         </div>
      </div>
   )
}

export default Todolist
