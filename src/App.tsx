import React, {useEffect} from 'react'
import {Route, NavLink} from 'react-router-dom'
import './App.css'
import {AppBar} from '@material-ui/core'
import {CircularProgress} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'
import {useSelector, useDispatch} from 'react-redux'
import {AppRootStateType} from './store/store'
import {RequestStatusType} from './store/app/appType'
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar'
import {TodolistsPage} from './pages/TodolistsPage/TodolistsPage'
import {Login} from './pages/Login/Login'
import {paths} from './layout/paths'
import {initializeAppTC} from './store/app/appAction'
import {logout} from './store/auth/authAction'

function App() {
   const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
   const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
   const dispatch = useDispatch()


   useEffect(() => {
      dispatch(initializeAppTC())
   })

   const logoutHandler = () => {
      dispatch(logout())
   }

   if (!initialized) {
      return <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
         <CircularProgress/>
      </div>
   }

   return (
      <div className="App">
         <AppBar position="static">

            {appStatus === 'loading' && <LinearProgress style={{position: 'absolute', top: '0', width: '100%'}}/>}

            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuOutlinedIcon/>
               </IconButton>

               <Typography variant="h6">
                  <NavLink to={paths.todo}>
                     Todo
                  </NavLink>
               </Typography>

               {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
            </Toolbar>

         </AppBar>

         <Route exact path={paths.todo}><TodolistsPage/></Route>
         <Route path={paths.login}><Login/></Route>

         <ErrorSnackbar/>
      </div>
   )
}

export default App
