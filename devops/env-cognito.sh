#!/bin/bash

if ! [ -x "$(command -v aws)" ]; then
  echo '==> Error: aws CLI not installed.' >&2
  else

  ENVIRONMENT=${1:-dev}
  STACK_NAME=app-seed-cognito

  export AWS_APP_COGNITO_REGION=ap-southeast-1
  export AWS_APP_COGNITO_APP_CLIENT_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoUserPoolClient")) | .PhysicalResourceId')
  export AWS_APP_COGNITO_USER_POOL_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoUserPool$")) | .PhysicalResourceId')
  export AWS_APP_COGNITO_IDENTITY_POOL_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoIdentityPool$")) | .PhysicalResourceId')
  export AWS_APP_COGNITO_USER_POOL_ARN=$(aws cognito-idp describe-user-pool --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID | jq -r '.UserPool.Arn')

  env | grep AWS_APP_COGNITO | sort

fi
