import React from 'react'
import {Grid} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {useFormik} from 'formik'
import {RequestLoginType} from '../../api/apiType'
import {loginTC} from '../../store/auth/authAction'

const validate = (values: RequestLoginType) => {
   const errors: any = {}

   if (!values.password) {
      errors.password = 'Required'
   }

   if (!values.email) {
      errors.email = 'Required'
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
   }

   return errors
}

const Login: React.FC = () => {
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
      validate,
      onSubmit: values => {
         // alert(JSON.stringify(values, null, 2))
         dispatch(loginTC(values))
      },
   })

   if(isLoggedIn) {
      return <Redirect to={'/todo'}/>
   }

   return (
      <>
         <Grid container justify="center">
            <Grid item xs={4}>
               <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                     <FormLabel>
                        <p>To log in get registered {' '}
                           <a href={'https://social-network.samuraijs.com/'}
                              target={'_blank'}>here
                           </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                     </FormLabel>
                     <FormGroup>
                        <TextField
                           label="Email"
                           margin="normal"
                           error={!!formik.errors.email}
                           helperText={formik.errors.email}
                           {...formik.getFieldProps('email')}
                        />
                        <TextField
                           type="password"
                           label="Password"
                           margin="normal"
                           error={!!formik.errors.password}
                           helperText={formik.errors.password}
                           {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel
                           label={'Remember me'}
                           control={<Checkbox/>}
                           {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                     </FormGroup>
                  </FormControl>
               </form>
            </Grid>
         </Grid>
      </>
   )
}

export default Login
