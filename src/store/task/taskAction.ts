import {ADD_TASK, CHANGE_STATUS_TASK, CHANGE_TITLE_TASK, REMOVE_TASK} from './taskType';
import {AddTodoActionType, RemoveTodoActionType} from '../todolist/todolistAction';

type AddTaskActionType = { type: typeof ADD_TASK, todoID: string, title: string }
export const addTaskAC = (todoID: string, title: string): AddTaskActionType => {
   return {
      type: ADD_TASK,
      todoID,
      title,
   }
}

type RemoveTaskActionType = { type: typeof REMOVE_TASK, todoID: string, taskID: string }
export const removeTaskAC = (todoID: string, taskID: string): RemoveTaskActionType => {
   return {
      type: REMOVE_TASK,
      todoID,
      taskID,
   }
}

type ChangeStatusTaskActionType = { type: typeof CHANGE_STATUS_TASK, todoID: string, taskID: string, newValue: boolean }
export const changeStatusTaskAC = (todoID: string, taskID: string, newValue: boolean): ChangeStatusTaskActionType => {
   return {
      type: CHANGE_STATUS_TASK,
      todoID,
      taskID,
      newValue,
   }
}

type ChangeTitleTaskActionType = { type: typeof CHANGE_TITLE_TASK, todoID: string, taskID: string, newValue: string }
export const changeTitleTaskAC = (todoID: string, taskID: string, newValue: string): ChangeTitleTaskActionType => {
   return {
      type: CHANGE_TITLE_TASK,
      todoID,
      taskID,
      newValue,
   }
}

export type ActionType
   = AddTaskActionType
   | RemoveTaskActionType
   | ChangeStatusTaskActionType
   | ChangeTitleTaskActionType
   | AddTodoActionType
   | RemoveTodoActionType
