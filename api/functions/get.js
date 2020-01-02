/* eslint-disable no-console */
const aws = require("aws-sdk")
// const CognitoIdentityServiceProvider = require("aws-sdk/clients").CognitoIdentityServiceProvider
// const groupFilter = require("../lib/groupFilter").groupFilter
import { groupFilter } from "../lib/groupFilter"
import { rbac } from "../lib/rbac"

exports.main = async (event, context) => {
  // console.log(event)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }

  const result = {
    headers
  }

  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider
  // Cognito authentication provider looks like:
  // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // Where us-east-1_aaaaaaaaa is the User Pool id
  // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id

  const parts = authProvider.split(":")
  const userPoolIdParts = parts[parts.length - 3].split("/")

  const userPoolId = userPoolIdParts[userPoolIdParts.length - 1]
  const userPoolUserId = parts[parts.length - 1]
  // console.log("userPoolId", userPoolId)
  // console.log("userPoolUserId", userPoolUserId)

  aws.config.region = event.region
  const cognitoIdentityServiceProvider = new aws.CognitoIdentityServiceProvider()

  try {
    const data = await cognitoIdentityServiceProvider
      .adminListGroupsForUser({
        UserPoolId: userPoolId,
        Username: userPoolUserId
      })
      .promise()

    // console.log("data", data)

    const groups = groupFilter(data)
    console.log("groups", groups)

    // operation
    const operation = "cognito:adminListGroupsForUser"
    const res = await rbac.can(groups, operation)
    console.log("rbac", res)

    if (!res) {
      result.statusCode = 403
      result.body = JSON.stringify({ message: "Unauthorized" })
      return result
    }
  } catch (e) {
    console.log("error", e)
    // Handle your error
  }

  result.statusCode = 200
  // result.body = JSON.stringify({ event, idp: { userPoolId, userPoolUserId } });
  // result.body = JSON.stringify({ event, context });
  result.body = JSON.stringify({ message: "Go Serverless v1.0! Your function executed successfully!" })

  return result
}
