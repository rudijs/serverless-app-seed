import * as AWS from "aws-sdk"
import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider"

export async function main(event, context) {
  AWS.config.region = event.region

  // https://stackoverflow.com/questions/50829843/get-cognito-user-pools-groups-data-in-lambda-function
  // https://stackoverflow.com/questions/58123206/how-do-you-pass-cognito-user-pool-groups-to-lambda-context-with-api-gateway
  // https://github.com/aws-amplify/amplify-js/issues/390

  // const params = {
  //   GroupName: "admin",
  //   UserPoolId: event.userPoolId,
  //   Username: event.userName
  // };

  // const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

  // try {
  //   await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
  //   context.done(null, event);
  // } catch (e) {
  //   context.done(e);
  // }
}
