const AWS = require("aws-sdk")
AWS.config.region = process.env.AWS_APP_COGNITO_REGION

describe("Set Global Variables", () => {
  it("should sign in to AWS and configure credentials", async () => {
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
    // console.log(params)

    try {
      const res1 = await cognito.adminInitiateAuth(params).promise()

      const authenticator = `cognito-idp.${process.env.AWS_APP_COGNITO_REGION}.amazonaws.com/${process.env.AWS_APP_COGNITO_USER_POOL_ID}`

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.AWS_APP_COGNITO_IDENTITY_POOL_ID,
        Logins: {
          [authenticator]: res1.AuthenticationResult.IdToken
        }
      })

      await AWS.config.credentials.getPromise()
    } catch (e) {
      console.log("Set up global test variables error", e)
    }
  })
})
