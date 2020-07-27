import React from 'react';

type TasksType = {
   id: string
   title: string
   isDone: boolean
}

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
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
                  <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>)
            }
         </ul>
         <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   )
}

export default Todolist
