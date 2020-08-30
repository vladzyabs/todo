import {TodoAPIType} from '../../api/apiType'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const CHANGE_TITLE_TODO = 'CHANGE_TITLE_TODO'
export const CHANGE_FILTER_TODO = 'CHANGE_FILTER_TODO'
export const SET_TODOS = 'SET_TODOS'

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = TodoAPIType & { filter: FilterType }
