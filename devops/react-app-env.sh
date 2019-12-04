#!/bin/bash

ENVIRONMENT=${1:-dev}
STACK_NAME=cognito-app-seed
SERVERLESS_API_STACK_NAME=serverless-seed-app-api

export AWS_RJS_COGNITO_REGION=ap-southeast-1
export AWS_RJS_COGNITO_APP_CLIENT_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoUserPoolClient")) | .PhysicalResourceId')
export AWS_RJS_COGNITO_USER_POOL_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoUserPool$")) | .PhysicalResourceId')
export AWS_RJS_COGNITO_IDENTITY_POOL_ID=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("CognitoIdentityPool$")) | .PhysicalResourceId')
export AWS_RJS_COGNITO_USER_POOL_ARN=$(aws cognito-idp describe-user-pool --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID | jq -r '.UserPool.Arn')
export AWS_RJS_SERVICE_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $SERVERLESS_API_STACK_NAME-${ENVIRONMENT} | jq -r '.Stacks[] | .Outputs[] | select(.OutputKey | match("ServiceEndpoint")) | .OutputValue')
export AWS_RJS_API_ONE=$(aws cloudformation describe-stack-resources --stack-name $SERVERLESS_API_STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("ApiGatewayRestApi")) | .PhysicalResourceId')

export REACT_APP_AWS_RJS_COGNITO_REGION=$AWS_RJS_COGNITO_REGION
export REACT_APP_AWS_RJS_COGNITO_APP_CLIENT_ID=$AWS_RJS_COGNITO_APP_CLIENT_ID
export REACT_APP_AWS_RJS_COGNITO_USER_POOL_ID=$AWS_RJS_COGNITO_USER_POOL_ID
export REACT_APP_AWS_RJS_COGNITO_IDENTITY_POOL_ID=$AWS_RJS_COGNITO_IDENTITY_POOL_ID
export REACT_APP_AWS_RJS_SERVICE_ENDPOINT=$AWS_RJS_SERVICE_ENDPOINT

env | grep AWS_RJS | sort
