import axios from 'axios'

const settings = {
   withCredentials: true,
   headers: {
      'API-KEY': 'ec5b15d4-74e9-420d-8187-76eec8294de7',
   },
}

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings,
})

export const todoAPI = {
   getTodos: () => instance.get(`todo-lists`),
   createTodo: (title: string) => instance.post(`todo-lists`, {title}),
   deleteTodo: (todoID: string) => instance.delete(`todo-lists/${todoID}`),
   updateTodo: (todoID: string, title: string) => instance.put(`todo-lists/${todoID}`, {title}),
}

export const taskAPI = {
   getTasks: (todoID: string) => instance.get(`todo-lists/${todoID}/tasks`),
   createTask: (todoID: string, title: string) => instance.post(`todo-lists/${todoID}/tasks`, {title}),
   deleteTask: (todoID: string, taskID: string) => instance.delete(`todo-lists/${todoID}/tasks/${taskID}`),
   updateTask: (todoID: string, taskID: string, model: {}) => instance.put(`todo-lists/${todoID}/tasks/${taskID}`, model)
}
