import React from "react";
import { inject, observer } from "mobx-react";

const SignInPage = inject("state")(
  observer(({ state, history }) => {
    return (
      <div>
        <h1>Sign In</h1>
        <button
          onClick={() => {
            state.setGroup("admin");
            history.push("/dashboard");
          }}
        >
          Sign In
        </button>
      </div>
    );
  })
);

export default SignInPage;
