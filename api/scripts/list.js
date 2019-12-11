// import * as AWS from "aws-sdk";
const AWS = require("aws-sdk")
// import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

AWS.config.region = process.env.AWS_RJS_COGNITO_REGION

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

var params = {
  // UserPoolId: 'STRING_VALUE', /* required */
  UserPoolId: process.env.AWS_RJS_COGNITO_USER_POOL_ID,
  AttributesToGet: [
    // 'STRING_VALUE',
    // /* more items */
    "sub",
    "email"
  ]
}

// Filter: 'STRING_VALUE',
// Limit: 'NUMBER_VALUE',
// PaginationToken: 'STRING_VALUE'
// cognitoidentityserviceprovider.listUsers(params, function(err, data) {
//   if (err) console.log(err, err.stack)
//   // an error occurred
//   else console.log(JSON.stringify(data, null, 2)) // successful response
// })

;(async function() {
  try {
    const res = await cognitoidentityserviceprovider.listUsers(params).promise()
    console.log("res", JSON.stringify(res, null, 2))
  } catch (e) {
    console.log("err", e)
  }
})()
