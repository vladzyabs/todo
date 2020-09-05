import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import {AppBar} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import LinearProgress from '@material-ui/core/LinearProgress'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'
import {RequestStatusType} from './store/app/appType'
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar'
import {TodolistsPage} from './pages/TodolistsPage/TodolistsPage'
import {Login} from './pages/Login/Login'
import {paths} from './layout/paths'

function App() {
   const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

   return (
      <div className="App">
         <AppBar position="static">

            {appStatus === 'loading' && <LinearProgress style={{position: 'absolute', top: '0', width: '100%'}}/>}

            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuOutlinedIcon/>
               </IconButton>
               <Typography variant="h6">
                  Todo
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>

         </AppBar>

         <Route exact path={paths.todo}><TodolistsPage/></Route>
         <Route path={paths.login}><Login/></Route>

         <ErrorSnackbar/>
      </div>
   )
}

export default App
