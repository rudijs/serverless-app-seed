#!/bin/bash

# required env variables
REQUIRED_VARIABLES="
AWS_APP_COGNITO_REGION
AWS_APP_COGNITO_APP_CLIENT_ID
AWS_APP_COGNITO_USER_POOL_ID
AWS_APP_COGNITO_IDENTITY_POOL_ID
AWS_APP_ADMIN_PASSWORD
"

for VARIABLE in $REQUIRED_VARIABLES
do
      name="$VARIABLE"

      if [ -z "${!VARIABLE}" ]; then
        echo "==> ERROR: $VARIABLE is not set"
        exit 0
      else
        echo "==> $VARIABLE => ${!VARIABLE}"
      fi
done

echo "==> Create Admin role"
aws cognito-idp sign-up \
--region $AWS_APP_COGNITO_REGION \
--client-id $AWS_APP_COGNITO_APP_CLIENT_ID \
--username admin@example.com  \
--password $AWS_APP_ADMIN_PASSWORD

echo "==> Confirm Admin role"
aws cognito-idp admin-confirm-sign-up \
--region $AWS_APP_COGNITO_REGION \
--user-pool-id $AWS_APP_COGNITO_USER_POOL_ID \
--username admin@example.com

echo "==> Create Admin group"
aws cognito-idp create-group --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --group-name admin --description 'Admin Group'

echo "==> Add to admin@example.com Admin role"
aws cognito-idp admin-add-user-to-group --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --group-name admin --username admin@example.com

echo "==> Create User role"
aws cognito-idp sign-up \
--region $AWS_APP_COGNITO_REGION \
--client-id $AWS_APP_COGNITO_APP_CLIENT_ID \
--username user@example.com  \
--password $AWS_APP_ADMIN_PASSWORD

echo "==> Confirm User role"
aws cognito-idp admin-confirm-sign-up \
--region $AWS_APP_COGNITO_REGION \
--user-pool-id $AWS_APP_COGNITO_USER_POOL_ID \
--username user@example.com

echo "==> Create User group"
aws cognito-idp create-group --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --group-name user --description 'User Group'

echo "==> Add user@example.com to User role"
aws cognito-idp admin-add-user-to-group --user-pool-id $AWS_APP_COGNITO_USER_POOL_ID --group-name user --username user@example.com