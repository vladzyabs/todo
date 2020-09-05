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

export const Login = React.memo(
   (props: {}) => {

      const formik = useFormik({
         initialValues: {
            email: '',
            password: '',
            rememberMe: false,
         },
         onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
         },
      })

      return (
         <Grid container justify={'center'} style={{marginTop: '50px'}}>
            <Grid item xs={4}>
               <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                     <FormLabel>
                        To log in get registered <a href={'https://social-network.samuraijs.com/'}>here</a>
                        or use common test account credentials. <br/>
                        Email: free@samuraijs.com <br/>
                        Password: free
                     </FormLabel>
                     <FormGroup>

                        <TextField name={'email'}
                                   label={'Email'}
                                   margin={'normal'}
                                   onChange={formik.handleChange}
                                   value={formik.values.email}/>

                        <TextField name={'password'}
                                   label={'password'}
                                   margin={'normal'}
                                   type={'password'}
                                   onChange={formik.handleChange}
                                   value={formik.values.password}/>

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox name={'rememberMe'}
                                                             color={'primary'}
                                                             onChange={formik.handleChange}
                                                             value={formik.values.rememberMe}/>}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>

                     </FormGroup>
                  </FormControl>
               </form>
            </Grid>
         </Grid>
      )
   },
)
