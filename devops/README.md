# Devops

## Overview

There are two main variations on setting up the cloud infrastructure:

1. Create everything new (API, Cognito, Frontend)
2. Create the API and or Frontend then connect it to an existing Cognito setup (existing users)

We'll list the steps for the two types here.

## Create everything from scratch (new environment)

- Create Dev Environment
- TODO: use app-seed-...-dev name...
- Deploy the serverless API
- `cd api`
- `sls --stage dev deploy`
- `cd ../devops`
- Create Cognito User Pool and Identity Pool
- `aws cloudformation create-stack --stack-name cognito-app-seed-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ApiOne,ParameterValue=$AWS_RJS_API_ONE`
- Set some shell environment variable used for creating cloudfront distribution
- `source ./scripts/app-env.sh`
- Create the frontend infrastructure (S3 Bucket, CloudFront distribution, Route53 DNS)
- `aws cloudformation create-stack --stack-name app-seed-client-dev --template-body file://static-site-stack.yaml --parameters ParameterKey=AcmCertificateArn,ParameterValue=$AWS_RJS_ACMCERTIFICATEARN`
- Update the Cognito IAM role to allow access to our API(s)
- `source ./react-app-env.sh`
- `aws cloudformation update-stack --stack-name cognito-app-seed-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ApiOne,ParameterValue=$AWS_RJS_API_ONE`
- Create test Admin and User accounts
- `export ADMIN_PASSWORD=<enter_a_password>`
- `./create-cognito-users.sh`
- Build and deploy the React App to S3 (and into the Cloudfront distribution)
- `./deploy.sh`
- The deploy script will output two URLs.
- The S3 direct URL is immediately available, the DNS domain name will take a short while as the Cloudfront distributions takes time to initialize.

## Delete the entire dev environment

- Frontend
- `aws s3 rm s3://dev-app.rudijs.com --recursive`
- `aws cloudformation delete-stack --stack-name app-seed-client-dev`
- `aws cloudformation delete-stack --stack-name cognito-app-seed-dev`
- API
- `cd api`
- `sls --stage dev remove`

## Create

- `cd projects/serverless-app-seed`
- `cd client/devops`
- `source ./app-env.sh`
- `aws cloudformation create-stack --stack-name cognito-notes-app-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM`
- `source ./react-app-env.sh`
- `export ADMIN_PASSWORD=<random-passowrd>`
- `./deploy.sh`

## Delete

- Frontend
- `aws s3 rm s3://dev-app.rudijs.com --recursive`
- `aws cloudformation delete-stack --stack-name client-dev`
- `aws cloudformation delete-stack --stack-name cognito-notes-app-dev`
- API
- `cd api`
- `sls --stage dev remove`

## API

- Deploy the API backend
- `sls deploy`

## Frontend

- Update the Cognito Identity Pool IAM Auth role to use the API
- `source ./react-app-env.sh`
- `aws cloudformation update-stack --stack-name cognito-notes-app-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ApiOne,ParameterValue=$AWS_RJS_API_ONE`
