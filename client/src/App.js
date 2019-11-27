import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";

import NavBar from "./components/layout/Nav";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import SignInPage from "./components/SignInPage";
import { inject } from "mobx-react";

const PrivateRoute = inject("state")(({ state, component: Component, ...rest }) => (
  <Route {...rest} render={props => (state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/signin" />)} />
));

function App() {
  return (
    <Router>
      <Container>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
