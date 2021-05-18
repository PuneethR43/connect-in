import React, {Fragment, useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

import NavBar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { loadUser } from './actions/authActions'

import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import ProfileForm from './components/forms/ProfileForm'
import ProfileEditForm from './components/forms/ProfileEditForm'
import ExperienceForm from './components/forms/ExperienceForm'
import EducationForm from './components/forms/EducationForm'
import Profiles from './components/profiles/Profiles'
import ProfileItem from './components/profiles/ProfileItem'
import ViewProfile from './components/profiles/view-profiles/ViewProfile'
import Posts from './components/posts/Posts'
import ViewPost from './components/posts/view-post/ViewPost'
if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
useEffect(() => {
  configureStore.dispatch(loadUser())
}, [])
  return(
    <Provider store = {configureStore}>
    <Fragment>
      <Router>
        <NavBar />
        <Route exact path = "/" component = {Landing} />
        <section className = "container">
          <Alert />
          <Switch>
            <Route exact path = "/signup" component = {Signup} />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/profiles" component = {Profiles} />
            <Route exact path = "/profile" component = {ProfileItem} />
            <Route exact path = "/profile/:id" component = {ViewProfile} />
            <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
            <PrivateRoute exact path = "/create-profile" component = {ProfileForm} />
            <PrivateRoute exact path = "/edit-profile" component = {ProfileEditForm} />
            <PrivateRoute exact path = "/add-experience" component = {ExperienceForm} />
            <PrivateRoute exact path = "/add-education" component = {EducationForm} />
            <PrivateRoute exact path = "/posts" component = {Posts} />
            <PrivateRoute exact path = "/posts/:id" component = {ViewPost} />
          </Switch>
        </section>
      </Router>
    </Fragment>
    </Provider>
  )
}

export default App;