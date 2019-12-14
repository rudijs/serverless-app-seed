const chai = require("chai")
const expect = chai.expect

const AWS = require("aws-sdk")
const sigV4Client = require("./sigV4Client").sigV4Client
const axios = require("axios")

describe("HTTP assertions", function() {
  AWS.config.region = process.env.AWS_APP_COGNITO_REGION

  const userToken = process.env.idToken

  const authenticator = `cognito-idp.${process.env.AWS_APP_COGNITO_REGION}.amazonaws.com/${process.env.AWS_APP_COGNITO_USER_POOL_ID}`

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_AWS_APP_COGNITO_IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  })

  it("should make authorized HTTP GET requests", async () => {
    await AWS.config.credentials.getPromise()
    // console.log(AWS.config.credentials.accessKeyId)

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

    const headers = signedRequest.headers
    // console.log(signedRequest.headers)
    // console.log(signedRequest.url)

    const res = await axios.get(signedRequest.url, { params: {}, headers })

    // console.log(res)
    expect(res.status).to.equal(200)
    expect(res.data.message).to.match(/Your function executed successfully/)
  })
})
