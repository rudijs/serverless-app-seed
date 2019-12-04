## Create a User Pool

https://serverless-stack.com/chapters/create-a-cognito-user-pool.html

## Create an Identity Pool

https://serverless-stack.com/chapters/create-a-cognito-identity-pool.html

User Pool ID and Add user to group serverless

https://serverless-stack.com/chapters/mapping-cognito-identity-id-and-user-pool-id.html

https://bitbucket.org/kineticdev/ssv-campaign/src/82455fc6076fc225444a9ff0a96e707bf4f5512e/src/api/functions/user-group.js?at=frontend-state

## AWS CLI

aws cognito-idp list-user-pools --max-items 10

aws cognito-idp describe-user-pool --user-pool-id <user-pool-id>

aws cognito-idp list-user-pool-clients --user-pool-id <user-pool-id>

## create user pool and user pool client, add a user

aws cognito-idp create-user-pool --pool-name demo-app --username-attributes "email"

aws cognito-idp create-user-pool-client --user-pool-id <user-pool-id> --client-name demo-app-client

aws cognito-idp sign-up \
 --region ap-southeast-1 \
 --client-id 1m6l9gr9p39im50cf5j468kp5d \
 --username admin@example.com \
 --password <password>

aws cognito-idp admin-confirm-sign-up \
 --region ap-southeast-1 \
 --user-pool-id <user-pool-id> \
 --username admin@example.com

aws cognito-idp create-group --user-pool-id <user-pool-id> --group-name admin

aws cognito-idp admin-add-user-to-group --user-pool-id <user-pool-id> --group-name admin --username admin@example.com

## create an identity pool

aws cognito-identity create-identity-pool --no-allow-unauthenticated-identities --identity-pool-name demo-app-react

create IAM roles

Auth Role w/ Trust Policy first
aws iam create-role --role-name Cognito_demoAppAuth_Role --assume-role-policy-document file://trust-relationship-auth.json --description "Cognito service auth role"
aws iam put-role-policy --role-name Cognito_demoAppAuth_Role --policy-name oneClick_Cognito_demoAppAuth_Role --policy-document file://cognito-idp-role-auth.json

UnAuth Role w/ Trust Policy first
aws iam create-role --role-name Cognito_demoAppUnAuth_Role --assume-role-policy-document file://trust-relationship-unauth.json --description "Cognito service unauth role"
aws iam put-role-policy --role-name Cognito_demoAppUnAuth_Role --policy-name oneClick_Cognito_demoAppUnAuth_Role --policy-document file://cognito-idp-role-unauth.json

aws cognito-identity set-identity-pool-roles \
--identity-pool-id "<identity-pool-id>" \
--roles authenticated="arn:aws:iam::111111111111:role/Cognito_reactdemoappIdentityPoolAuth_Role"

## Delete examples

aws cognito-identity list-identity-pools --max-results 10
aws cognito-identity delete-identity-pool --identity-pool-id <identity-pool-id>

aws cognito-idp list-user-pools --max-items 10
aws cognito-idp delete-user-pool --user-pool-id <user-pool-id>

## Cloudformation

aws cloudformation create-stack --stack-name cognito --template-body file://cognito-user-pool.yaml --capabilities CAPABILITY_NAMED_IAM
aws cloudformation delete-stack --stack-name cognito

source ./app-env.sh

aws cognito-idp sign-up \
--region $AWS_RJS_COGNITO_REGION \
 --client-id $AWS_RJS_COGNITO_APP_CLIENT_ID \
 --username admin@example.com \
 --password <password>

aws cognito-idp admin-confirm-sign-up \
--region $AWS_RJS_COGNITO_REGION \
 --user-pool-id $AWS_RJS_COGNITO_USER_POOL_ID \
 --username admin@example.com

- `aws cloudformation create-stack --stack-name cognito-notes-app-dev --template-body file://cognito.yaml --capabilities CAPABILITY_NAMED_IAM`
- `aws cloudformation delete-stack --stack-name cognito-notes-app-dev`

```
aws cloudformation create-stack \
--stack-name cognito-notes-app-prod \
--template-body file://cognito.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=Environment,ParameterValue=production
```

- `aws cloudformation delete-stack --stack-name cognito-notes-app-prod`
