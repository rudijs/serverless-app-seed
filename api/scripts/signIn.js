const AWS = require("aws-sdk")

AWS.config.region = process.env.AWS_APP_COGNITO_REGION

const cognito = new AWS.CognitoIdentityServiceProvider()

let params = {
  AuthFlow: "ADMIN_NO_SRP_AUTH",
  ClientId: process.env.AWS_APP_COGNITO_APP_CLIENT_ID,
  UserPoolId: process.env.AWS_APP_COGNITO_USER_POOL_ID,
  AuthParameters: {
    USERNAME: "user@example.com",
    PASSWORD: process.env.AWS_APP_ADMIN_PASSWORD
  }
}

cognito
  .adminInitiateAuth(params)
  .promise()
  .then(res => console.log("res", res))
  .catch(err => console.log("err", err))
