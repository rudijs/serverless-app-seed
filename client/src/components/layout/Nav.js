import React from "react";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

const Nav = inject("state")(
  observer(({ state, history }) => {
    console.log(state.isAuthenticated);
    return (
      <div>
        <span>Nav Bar: {state.group}</span> |&nbsp;
        <Link to="/">Home</Link> |&nbsp;
        {state.isAuthenticated ? (
          <React.Fragment>
            <Link to="/dashboard">Dashboard</Link>|&nbsp;
            <button
              onClick={() => {
                state.setGroup("guest");
                history.push("/");
              }}
            >
              Sign Out
            </button>
            |&nbsp;
          </React.Fragment>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    );
  })
);

export default withRouter(Nav);
