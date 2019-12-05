exports.main = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  const result = {
    headers
  };

  // const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  // // Cognito authentication provider looks like:
  // // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // // Where us-east-1_aaaaaaaaa is the User Pool id
  // // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id
  // const parts = authProvider.split(":");
  // const userPoolIdParts = parts[parts.length - 3].split("/");

  // const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
  // const userPoolUserId = parts[parts.length - 1];

  result.statusCode = 200;
  // result.body = JSON.stringify({ event, idp: { userPoolId, userPoolUserId } });
  // result.body = JSON.stringify({ event, context });
  result.body = JSON.stringify({ message: "Go Serverless v1.0! Your function executed successfully!" });

  return result;
};
