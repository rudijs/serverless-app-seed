const AWS = require('aws-sdk')

AWS.config.region = process.env.AWS_RJS_COGNITO_REGION

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

// var params = {
//   // AccessToken: "STRING_VALUE" /* required */
//   AccessToken: process.env.accessToken
// };

// cognitoidentityserviceprovider.globalSignOut(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

// cognitoIdentityServiceProvider.getUser(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

var params = {
  // UserPoolId: 'STRING_VALUE', /* required */
  UserPoolId: process.env.AWS_RJS_COGNITO_USER_POOL_ID,
  // Username: 'STRING_VALUE' /* required */
  // Username: '17b0c74f-1934-4d78-98c4-7c20ac7a3fbc', // admin
  Username: '2ced4098-387a-4e34-b57a-ceee4305e647', // user
}

cognitoIdentityServiceProvider.adminUserGlobalSignOut(params, function(
  err,
  data,
) {
  if (err) console.log('err', err, err.stack)
  // an error occurred
  else console.log('data', data) // successful response
})
