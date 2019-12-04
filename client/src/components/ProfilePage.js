import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { API } from "aws-amplify";

const ProfilePage = inject("state")(
  observer(({ state }) => {
    const [res, setRes] = useState("loading...");

    useEffect(() => {
      async function getToken() {
        let res = "Default Message";

        try {
          res = await API.get("notes", "/notes");
          setRes(res.message);
        } catch (e) {
          console.log("error", e);
          setRes(res);
        }
        // const token = await API.post("notes", "/notes", {
        // body: { foo: "bar" }
        // });
        console.log("res", res.message);
      }
      getToken();
    }, []);

    return (
      <>
        <h1>Profile Page</h1>
        <p>Group: {state.groups}</p>
        <p>Res: {res}</p>
      </>
    );
  })
);

export default ProfilePage;
