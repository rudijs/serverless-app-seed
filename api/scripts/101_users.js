const AWS = require("aws-sdk")
const sigV4Client = require("./sigV4Client").sigV4Client
const fetch = require("node-fetch")

// https://serverless-stack.com/chapters/connect-to-api-gateway-with-iam-auth.html
// https://serverless-stack.com/chapters/mapping-cognito-identity-id-and-user-pool-id.html

// sign in and get jwt tokens
// aws cognito-idp admin-initiate-auth --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --client-id $AWS_APP_COGNITO_APP_CLIENT_ID --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=user@example.com,PASSWORD=$AWS_APP_ADMIN_PASSWORD | jq -r '.AuthenticationResult.IdToken'
// export idToken=$(aws cognito-idp admin-initiate-auth --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --client-id $AWS_APP_COGNITO_APP_CLIENT_ID --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=user@example.com,PASSWORD=$AWS_APP_ADMIN_PASSWORD | jq -r '.AuthenticationResult.IdToken')
// use idToken to get creds
// sign request
// make request

AWS.config.region = process.env.AWS_APP_COGNITO_REGION
console.log(AWS.config.credentials.accessKeyId)

const userToken = process.env.idToken

const authenticator = `cognito-idp.${process.env.AWS_APP_COGNITO_REGION}.amazonaws.com/${process.env.AWS_APP_COGNITO_USER_POOL_ID}`

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.REACT_APP_AWS_APP_COGNITO_IDENTITY_POOL_ID,
  Logins: {
    [authenticator]: userToken
  }
})
;(async () => {
  try {
    await AWS.config.credentials.getPromise()
    console.log(AWS.config.credentials.accessKeyId)

    const signedRequest = sigV4Client
      .newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: process.env.AWS_APP_COGNITO_REGION,
        endpoint: process.env.REACT_APP_AWS_APP_SERVICE_ENDPOINT
      })
      .signRequest({
        method: "GET", // method,
        path: "/notes", //path,
        headers: {}, // headers,
        queryParams: {}, // queryParams,
        body: {} // body
      })

    // body = body ? JSON.stringify(body) : body;
    const headers = signedRequest.headers

    const results = await fetch(signedRequest.url, {
      method: "GET", // method,
      headers
      // body: {} // body
    })

    if (results.status !== 200) {
      throw new Error(await results.text())
    }

    const res2 = await results.json()

    console.log("res2", res2)
  } catch (e) {
    console.log("err", e)
  }
})()
