import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

import Container from "react-bootstrap/Container";
import NavBar from "./components/layout/Nav";
import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import SignInPage from "./components/SignInPage";
import { inject } from "mobx-react";

// const PrivateRoute = inject("state")(({ state, component: Component, ...rest }) => (
//   <Route {...rest} render={props => (state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/signin" />)} />
// ));
const PrivateRoute = inject("state")(({ state, component: Component, ...rest }) => {
  console.log(101, state.isAuthenticated);
  return <Route {...rest} render={props => (state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/signin" />)} />;
});
const App = inject("state")(({ state }) => {
  useEffect(() => {
    console.log(101, "onLoad()");

    async function onLoad() {
      try {
        const currentSession = await Auth.currentSession();
        const groups = currentSession.getIdToken().payload["cognito:groups"];
        console.log(groups);
        if (groups) {
          state.setGroup(groups[0]);
        }
      } catch (e) {
        if (e !== "No current user") {
          alert(e);
        }
      }
    }
    onLoad();
  }, [state]); // linter wants 'state' else it complains about dependency. state is a mobx-state-tree that shouldn't 'change' so this useEffect is called once only.

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
});

export default App;
