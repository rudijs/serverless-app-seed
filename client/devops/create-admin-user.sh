#!/bin/bash

aws cognito-idp sign-up \
--region $AWS_RJS_COGNITO_REGION \
--client-id $AWS_RJS_COGNITO_APP_CLIENT_ID \
--username admin@example.com  \
--password $ADMIN_PASSWORD

aws cognito-idp admin-confirm-sign-up \
--region $AWS_RJS_COGNITO_REGION \
--user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID \
--username admin@example.com

aws cognito-idp create-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name admin

aws cognito-idp admin-add-user-to-group --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID --group-name admin --username admin@example.com
