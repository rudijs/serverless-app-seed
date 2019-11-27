import React from "react";
import { inject, observer } from "mobx-react";

const HomePage = inject("state")(
  observer(({ state }) => {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  })
);

export default HomePage;
