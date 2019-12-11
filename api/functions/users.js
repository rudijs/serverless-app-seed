import * as AWS from "aws-sdk"
// import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider"

exports.main = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }

  const result = {
    headers
  }

  AWS.config.region = process.env.region
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

  const params = {
    UserPoolId: process.env.userPoolId,
    AttributesToGet: ["sub", "email"]
  }

  try {
    const res = await cognitoidentityserviceprovider.listUsers(params).promise()
    // eslint-disable-next-line no-console
    console.log("res", res)
    result.statusCode = 200
    result.body = JSON.stringify(res.Users)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("err", e)
    result.statusCode = 500
    result.body = JSON.stringify(e)
  }

  return result
}
