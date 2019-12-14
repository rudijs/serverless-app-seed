const chai = require("chai")
const expect = chai.expect

const AWS = require("aws-sdk")
const sigV4Client = require("../lib/sigV4Client").sigV4Client
const axios = require("axios")

describe("HTTP assertions", function() {
  it("should fetch users", async () => {
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
        path: "/user", //path,
        headers: {}, // headers,
        queryParams: {}, // queryParams,
        body: {} // body
      })

    const headers = signedRequest.headers
    // console.log(signedRequest.headers)
    // console.log(signedRequest.url)

    const res = await axios.get(signedRequest.url, { params: {}, headers })

    expect(res.status).to.equal(200)
    expect(res.headers["content-type"]).to.equal("application/json")

    // console.log(JSON.stringify(res.data, null, 2))
    expect(res.data.length).to.equal(2)
  })
})
