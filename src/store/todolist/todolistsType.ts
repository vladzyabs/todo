import {TodoAPIType} from '../../api/apiType'

export type FilterType = 'all' | 'active' | 'completed'
export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistType = TodoAPIType & { filter: FilterType, entityStatus: EntityStatusType }
