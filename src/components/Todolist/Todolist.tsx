import React from 'react';

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
   removeTasks: (tasksID: string) => void
   changeFilter: (filter: FilterType) => void
}

function Todolist(props: TodolistPropsType) {
   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input type="text"/>
            <button>add</button>
         </div>
         <ul>
            {
               props.tasks.map(t =>
                  <li key={t.id}>
                     <input type="checkbox" checked={t.isDone}/>
                     <span>{t.title}</span>
                     <button onClick={() => props.removeTasks(t.id)}>remove</button>
                  </li>)
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
