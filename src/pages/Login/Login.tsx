import React from 'react'
import {Grid} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import {useFormik} from 'formik'
import {login} from '../../store/auth/authAction'
import {useDispatch} from 'react-redux'

export const Login = React.memo(
   (props: {}) => {
      const dispatch = useDispatch()

      const formik = useFormik({
         initialValues: {
            email: '',
            password: '',
            rememberMe: false,
         },
         validate: values => {
            if (!values.email) {
               return {email: 'bad email'}
            }
            if (!values.password) {
               return {password: 'bad password'}
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
               return {email: 'Invalid email address'}
            }
         },
         onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe))
         },
      })

      return (
         <Grid container justify={'center'} style={{marginTop: '50px'}}>
            <Grid item xs={4}>
               <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                     <FormLabel>
                        <p>To log in get registered <a href={'https://social-network.samuraijs.com/'}>here</a></p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com </p>
                        <p>Password: free</p>
                     </FormLabel>
                     <FormGroup>

                        <TextField label={'Email'}
                                   margin={'normal'}
                                   {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                        <TextField label={'password'}
                                   margin={'normal'}
                                   type={'password'}
                                   {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox color={'primary'}
                                                             {...formik.getFieldProps('rememberMe')}/>}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>

                     </FormGroup>
                  </FormControl>
               </form>
            </Grid>
         </Grid>
      )
   },
)
