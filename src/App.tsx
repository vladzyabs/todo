import React from 'react';
import './App.css';
import Todolist from './components/Todolist/Todolist';
import {v1} from 'uuid';

function App() {

   const tasks = [
      {id: v1(), title: 'task 1', isDone: true},
      {id: v1(), title: 'task 2', isDone: false},
      {id: v1(), title: 'task 3', isDone: true},
   ]

   return (
      <div className="App">
         <Todolist title={'todo 1'} tasks={tasks}/>
      </div>
   );
}

export default App;
