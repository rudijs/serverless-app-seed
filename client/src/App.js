import React from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import customHistory from './history'
import ReactGA from 'react-ga'
import config from './config'
import {inject} from 'mobx-react'

import Container from '@material-ui/core/Container'
import NavBar from './components/layout/Nav'
import HomePage from './components/HomePage'
import DashboardPage from './components/DashboardPage'
import ProfilePage from './components/ProfilePage'
import SignInPage from './components/SignInPage'
import UsersPage from './components/Users'

const trackingId = config.googleAnalytics.trackingId

if (trackingId) {
  ReactGA.initialize(trackingId)

  customHistory.listen(location => {
    ReactGA.set({page: location.pathname}) // Update the user's current page
    ReactGA.pageview(location.pathname) // Record a pageview for the given page
  })
}

const PrivateRoute = inject(
  'state',
)(({state, component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      state.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
))

const App = () => {
  return (
    <Router history={customHistory}>
      <NavBar />
      {/* <Container style={{marginTop: '2em'}}> */}
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/users" component={UsersPage} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
