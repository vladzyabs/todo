import React, {useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import './App.css'
import {AppBar} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'
import {RequestStatusType} from './store/app/appReducer'
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar'
import TodolistsPage from './pages/TodolistsPage/TodolistsPage'
import Login from './pages/LoginPage/Login'
import {initializeAppTC} from './store/app/appReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import {logout} from './store/auth/authThunks'

function App() {
   const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
   const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initializeAppTC())
   }, [])

   const logoutHandler = () => {
      dispatch(logout())
   }

   if (!isInitialized) {
      return <div
         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   }

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuOutlinedIcon/>
               </IconButton>
               <Typography variant="h6">
                  Todo
               </Typography>
               {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
            </Toolbar>
            {appStatus === 'loading' && <LinearProgress style={{position: 'absolute', top: '0', width: '100%'}}/>}
         </AppBar>

         <Container fixed>
            <Redirect from={'/'} to={'/todo'}/>
            <Route path={'/todo'} render={() => <TodolistsPage/>}/>
            <Route path={'/login'} render={() => <Login/>}/>
         </Container>

         <ErrorSnackbar/>
      </div>
   )
}

export default App
