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
