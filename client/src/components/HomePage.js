import React from "react";
import { inject, observer } from "mobx-react";
import Jumbotron from "react-bootstrap/Jumbotron";

const HomePage = inject("state")(
  observer(({ state }) => {
    return (
      <Jumbotron>
        <h1>Home Page</h1>
        <p>Serverless App Seed</p>
        <p>ReactJS, Serverless Framework, AWS Cognito, S3 and Cloudfront</p>
      </Jumbotron>
    );
  })
);

export default HomePage;
