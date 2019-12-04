#!/bin/bash

if [ -z "$AWS_RJS_COGNITO_REGION" ]; then
      echo "==> ERROR: AWS_RJS_COGNITO_REGION is not set"
      exit 1
fi

if [ -z "$AWS_RJS_COGNITO_APP_CLIENT_ID" ]; then
      echo "==> ERROR: AWS_RJS_COGNITO_APP_CLIENT_ID is not set"
      exit 1
fi

if [ -z "$AWS_RJS_COGNITO_USER_POOL_ID" ]; then
      echo "==> ERROR: AWS_RJS_COGNITO_USER_POOL_ID is not set"
      exit 1
fi

if [ -z "$ADMIN_PASSWORD" ]; then
      echo "==> ERROR: ADMIN_PASSWORD is not set"
      exit 1
fi

echo "==> Create Admin role"
aws cognito-idp sign-up \
--region $AWS_RJS_COGNITO_REGION \
--client-id $AWS_RJS_COGNITO_APP_CLIENT_ID \
--username admin@example.com  \
--password $ADMIN_PASSWORD

echo "==> Confirm Admin role"
aws cognito-idp admin-confirm-sign-up \
--region $AWS_RJS_COGNITO_REGION \
--user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID \
--username admin@example.com

echo "==> Create Admin group"
aws cognito-idp create-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name admin

echo "==> Add to admin@example.com Admin role"
aws cognito-idp admin-add-user-to-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name admin --username admin@example.com

echo "==> Create User role"
aws cognito-idp sign-up \
--region $AWS_RJS_COGNITO_REGION \
--client-id $AWS_RJS_COGNITO_APP_CLIENT_ID \
--username user@example.com  \
--password $ADMIN_PASSWORD

echo "==> Confirm User role"
aws cognito-idp admin-confirm-sign-up \
--region $AWS_RJS_COGNITO_REGION \
--user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID \
--username user@example.com

echo "==> Create User group"
aws cognito-idp create-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name user 

echo "==> Add user@example.com to User role"
aws cognito-idp admin-add-user-to-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name user --username user@example.com