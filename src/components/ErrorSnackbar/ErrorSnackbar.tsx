import React from 'react'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {Snackbar} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {setAppErrorAC} from '../../store/app/appAction'

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />

export const ErrorSnackbar = () => {
   const error = useSelector<AppRootStateType, null | string>(state => state.app.error)
   const dispatch = useDispatch()

   const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }
      dispatch(setAppErrorAC(null))
   }

   return (
      <Snackbar open={error !== null} autoHideDuration={10000} onClose={handleClose}>
         <Alert onClose={handleClose} severity={'error'}>
            {error}
         </Alert>
      </Snackbar>
   )
}
