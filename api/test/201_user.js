const chai = require("chai")
const expect = chai.expect

const AWS = require("aws-sdk")
const sigV4Client = require("../lib/sigV4Client").sigV4Client
const axios = require("axios")

describe("/User", function() {
  it("should fetch all users", async () => {
    const signedRequest = sigV4Client
      .newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: process.env.AWS_APP_COGNITO_REGION,
        endpoint: process.env.REACT_APP_AWS_APP_SERVICE_ENDPOINT
      })
      .signRequest({
        method: "GET",
        path: "/user",
        headers: {},
        queryParams: {},
        body: {}
      })

    const headers = signedRequest.headers

    const res = await axios.get(signedRequest.url, { params: {}, headers })
    // console.log(JSON.stringify(res.data, null, 2))
    expect(res.status).to.equal(200)
    expect(res.headers["content-type"]).to.equal("application/json")
    expect(res.data.length).to.equal(2)
  })

  it("should fetch a single user", async () => {
    const userName = "9e429c9e-53ea-4f16-8ea9-45cce22e38dc"

    const signedRequest = sigV4Client
      .newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: process.env.AWS_APP_COGNITO_REGION,
        endpoint: process.env.REACT_APP_AWS_APP_SERVICE_ENDPOINT
      })
      .signRequest({
        method: "GET",
        path: `/user/${userName}`,
        headers: {},
        queryParams: {},
        body: {}
      })

    const headers = signedRequest.headers

    const res = await axios.get(signedRequest.url, { params: {}, headers })
    // console.log(JSON.stringify(res.data, null, 2))
    expect(res.status).to.equal(200)
    expect(res.headers["content-type"]).to.equal("application/json")
    expect(res.data.Username).to.equal(userName)
  })
})
