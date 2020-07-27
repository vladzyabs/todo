import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType} from './components/Todolist/Todolist';
import {v1} from 'uuid';

function App() {

   const [tasks, setTasks] = useState([
      {id: v1(), title: 'task 1', isDone: true},
      {id: v1(), title: 'task 2', isDone: false},
      {id: v1(), title: 'task 3', isDone: true},
   ])
   const [filter, setFilter] = useState<FilterType>('all')

   let filterTasks = tasks
   switch (filter) {
      case 'active':
         filterTasks = tasks.filter(t => !t.isDone)
         break
      case 'completed':
         filterTasks = tasks.filter(t => t.isDone)
         break
      default:
         filterTasks = tasks
   }

   const addTask = (title: string) => {
      const newtask = {id: v1(), title: title.trim(), isDone: false}
      setTasks( prevState => [newtask, ...prevState])
   }

   const removeTask = (taskID: string) => {
      setTasks(prevState => prevState.filter(t => t.id !== taskID))
   }

   const changeTaskStatus = (taskID: string, value: boolean) => {
      const task = tasks.find(t => t.id === taskID)
      if (task) {
         task.isDone = value
         setTasks(prevState => [...prevState])
      }
   }

   return (
      <div className="App">
         <Todolist title={'todo 1'}
                   tasks={filterTasks}
                   filter={filter}
                   removeTask={removeTask}
                   addTask={addTask}
                   changeTaskStatus={changeTaskStatus}
                   changeFilter={setFilter}/>
      </div>
   );
}

export default App;
