import React from "react";
import { inject, observer } from "mobx-react";

const ProfilePage = inject("state")(
  observer(({ state }) => {
    return (
      <>
        <h1>Profile Page</h1>
        <p>Group: {state.groups}</p>
      </>
    );
  })
);

export default ProfilePage;
