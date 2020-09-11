import axios from 'axios'
import {
   GetTasksResponseType,
   RequestLoginType,
   ResponseType,
   TaskAPIType,
   TodoAPIType,
   UpdateTaskModelType,
} from './apiType'

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
   getTodos: () =>
      instance.get<TodoAPIType[]>(`todo-lists`),
   createTodo: (title: string) =>
      instance.post<ResponseType<{ item: TodoAPIType }>>(`todo-lists`, {title}),
   deleteTodo: (todoID: string) =>
      instance.delete<ResponseType>(`todo-lists/${todoID}`),
   updateTodo: (todoID: string, title: string) =>
      instance.put<ResponseType>(`todo-lists/${todoID}`, {title}),
}

export const taskAPI = {
   getTasks: (todoID: string) =>
      instance.get<GetTasksResponseType>(`todo-lists/${todoID}/tasks`),
   createTask: (todoID: string, title: string) =>
      instance.post<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todoID}/tasks`, {title}),
   deleteTask: (todoID: string, taskID: string) =>
      instance.delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`),
   updateTask: (todoID: string, taskID: string, model: UpdateTaskModelType) =>
      instance.put<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todoID}/tasks/${taskID}`, model),
}

export const authAPI = {
   getMe: () =>
      instance.get<ResponseType<{ id: number, email: string, login: string }>>(`/auth/me`),
   login: (data: RequestLoginType) =>
      instance.post<ResponseType<{ userId: number }>>(`/auth/login`, data),
   logout: () =>
      instance.delete<ResponseType>(`/auth/login`),
}
