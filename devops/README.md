# Devops

## Overview

There are two main variations on setting up the cloud infrastructure:

1. Create everything new (API, Cognito, Frontend)
2. Create the API and or Frontend then connect it to an existing Cognito setup (existing users)

We'll list the steps for the two types here.

## Requirements

1. AWS CLI
2. NodeJS

## Create everything from scratch (new environment)

Prerequisite: Domain name set up with TLS certificate.

Set some shell environment variable used for creating AWS infrastructure

- `cd devops`
- `source ./env.sh`

Create Cognito User Pool and Identity Pool first

- `aws cloudformation create-stack --stack-name app-seed-cognito-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM`
- Create test Admin and User accounts
- `source ./env-cognito.sh`
- `export AWS_APP_ADMIN_PASSWORD=<enter_a_password>`
- `./create-cognito-users.sh`

Deploy the serverless API

- `cd ../api`
- `npm install`
- `sls --stage dev deploy`
- `cd ../devops`

Update the Cognito IAM role to allow access to our API(s)

- `source ./env-serverless.sh`
- `aws cloudformation update-stack --stack-name app-seed-cognito-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ApiOne,ParameterValue=$AWS_APP_API_ONE`

At this point you can run the API endpoint tests (see below), or continue to setup the frontend application then test after that.

Create the frontend infrastructure (S3 Bucket, CloudFront distribution, Route53 DNS)

- `aws cloudformation create-stack --stack-name app-seed-client-dev --template-body file://static-site-stack.yaml --parameters ParameterKey=AcmCertificateArn,ParameterValue=$AWS_APP_ACMCERTIFICATEARN`

Build and deploy the React App to S3 (and into the Cloudfront distribution)

- TODO: put in AWS secrets REACT_APP_AWS_APP_GOOGLE_TRACKING_ID
- `export AWS_APP_GOOGLE_TRACKING_ID=<ID>`
- `source ./env-react.sh`
- `cd ../client && npm install && cd ../devops`
- `./deploy-frontend.sh`
- The deploy script will output two URLs.
- The S3 direct URL is immediately available, the DNS domain name will take a short while as the Cloudfront distributions takes time to initialize.

## Delete the entire dev environment

- Frontend
- `aws s3 rm s3://dev-app.rudijs.com --recursive`
- `aws s3 rm s3://dev-app.rudijs.com.analytics --recursive`
- `aws cloudformation delete-stack --stack-name app-seed-client-dev`
- `aws cloudformation delete-stack --stack-name app-seed-cognito-dev`
- API
- `cd api`
- `sls --stage dev remove`
- Analytics
- See the 'Delete and clean up' section in [README-ANALYTICS.md](README-ANALYTICS.md)

## Remove and Create again the serverless API

- `cd api`
- `sls --stage dev remove`
- `sls --stage dev deploy`
- We now have a new API URL endpoint and new API Gateway ID
- Update the Cognito Identity Pool Auth Role to use the new API Gateway ID
- `cd ../devops`
- `source ./env-serverless.sh`
- `aws cloudformation update-stack --stack-name app-seed-cognito-dev --template-body file://cognito-stack.yaml --capabilities CAPABILITY_NAMED_IAM --parameters ParameterKey=ApiOne,ParameterValue=$AWS_APP_API_ONE`
- Re-deploy the React frontend app, it will also need to use new API URL endpoint
- `source ./env-react.sh`
- `./deploy-frontend.sh`

## Remove and Create again the serverless S3 hosted Cloudfront ReactJS app

- `cd devops`
- `aws s3 rm s3://dev-app.rudijs.com --recursive`
- `aws cloudformation delete-stack --stack-name app-seed-client-dev`
- After a few minutes to allow for the Cloudformation distribution to be removed....
- Set some shell environment variable used for creating cloudfront distribution
- `source ./app-env.sh`
- Create the frontend infrastructure (S3 Bucket, CloudFront distribution, Route53 DNS)
- `aws cloudformation create-stack --stack-name app-seed-client-dev --template-body file://static-site-stack.yaml --parameters ParameterKey=AcmCertificateArn,ParameterValue=$AWS_APP_ACMCERTIFICATEARN`
- Build and deploy the React App to S3 (and into the Cloudfront distribution)
- `source ./react-app-env.sh`
- `./deploy-frontend.sh`

## Regular Frontend deployment

- `cd devops`
- `source ./react-app-env.sh`
- `sls deploy`

## Regular serverless API deployment

- `cd api`
- `sls --stage dev deploy`
- or
- `sls --stage dev deploy -f hello`

## Tests

API

- `cd api`
- Unit tests (local)
- `npm test`
- HTTP API tests (remote - the deployed serverless lambda functions)
- `npm run test-api`

Frontend Unit Tests using Jest

- `cd client`
- Unit tests (local)
- `npm test`

Integration (end to end) tests using Cypress

- Local env
- `npm start`
- `npm run cypress:open`
- Dev env on AWS
- `STAGE=dev npm run cypress:open`
- Viewport will default to mobile (responsive) size 900 x 400
- Set the viewport to desktop with the BREAKPOINT env var. Example:
- `STAGE=dev BREAKPOINT=desktop npm run cypress:open`
