import * as AWS from "aws-sdk";
import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

export async function main(event, context) {
  AWS.config.region = event.region;

  const params = {
    GroupName: "admin",
    UserPoolId: event.userPoolId,
    Username: event.userName
  };

  const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

  try {
    await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    context.done(null, event);
  } catch (e) {
    context.done(e);
  }
}
