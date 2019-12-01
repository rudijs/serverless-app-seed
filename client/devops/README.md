# Devops

## Cognito Stack

- Create Dev Environment
- `cd devops`
- `aws cloudformation create-stack --stack-name cognito-notes-app-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM`
- Query AWS and set env vars for client use
- `source ../scripts/app-env.sh`
- Create an Admin user
- `export ADMIN_PASSWORD=<enter_a_password>`

* Delete Dev Environment
* `aws cloudformation delete-stack --stack-name cognito-notes-app-dev`

## Create

- `cd projects/serverless-app-seed`
- `cd client/devops`
- `source ./app-env.sh`
- `aws cloudformation create-stack --stack-name cognito-notes-app-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM`
- `aws cloudformation create-stack --stack-name client-dev --template-body file://static-site-stack.yaml --parameters ParameterKey=AcmCertificateArn,ParameterValue=$AWS_RJS_ACMCERTIFICATEARN`
- `source ./react-app-env.sh`
- `./create-admin-user.sh`
- `./deploy.sh`

## Delete

- `aws s3 rm s3://dev-app.rudijs.com --recursive`
- `aws cloudformation delete-stack --stack-name client-dev`
- `aws cloudformation delete-stack --stack-name cognito-notes-app-dev`
