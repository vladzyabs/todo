export type ResponseType<T = {}> = {
   resultCode: number
   messages: string[]
   data: T
}

export type TodoAPIType = {
   id: string
   title: string
   addedDate: string
   order: number
}

export enum TaskStatuses {
   New,
   InProgress,
   Completed,
   Draft,
}

export enum TodoTaskPriority {
   Low,
   Middle,
   Hi,
   Urgently,
   Later,
}

export type TaskAPIType = {
   todoListId: string
   id: string
   title: string
   description: string
   addedDate: string
   startDate: string
   deadline: string
   order: number
   status: TaskStatuses
   priority: TodoTaskPriority
}

export type GetTasksResponseType = {
   items: TaskAPIType[]
   error: string | null
   totalCount: number
}

export type UpdateTaskModelType = {
   title: string
   description: string
   status: number
   priority: number
   startDate: string
   deadline: string
}

export type RequestLoginType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: boolean
}
