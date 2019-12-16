#!/usr/bin/env bash

if ! [ -x "$(command -v aws)" ]; then
  echo '==> Error: aws CLI not installed.' >&2
  exit 0
fi

# required env variables
REQUIRED_VARIABLES="
AWS_APP_PROFILE
AWS_APP_ENVIRONMENT
AWS_APP_SUBDOMAIN
AWS_APP_DOMAINNAME
REACT_APP_AWS_APP_SERVICE_ENDPOINT
REACT_APP_AWS_APP_COGNITO_REGION
REACT_APP_AWS_APP_COGNITO_USER_POOL_ID
REACT_APP_AWS_APP_COGNITO_APP_CLIENT_ID
REACT_APP_AWS_APP_COGNITO_IDENTITY_POOL_ID
REACT_APP_AWS_APP_GOOGLE_TRACKING_ID
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

APP_DOMAIN_NAME="${AWS_APP_ENVIRONMENT}-${AWS_APP_SUBDOMAIN}.${AWS_APP_DOMAINNAME}"

BUCKET_LOCATION=$(aws --profile $AWS_APP_PROFILE s3api get-bucket-location --bucket $APP_DOMAIN_NAME | jq -r  .LocationConstraint)

echo "==> Building => $APP_DOMAIN_NAME"
echo "==> Region   => $BUCKET_LOCATION"

pushd ../client

npm run build

echo "==> Deploying to AWS S3 ${APP_DOMAIN_NAME}"

aws --profile $AWS_APP_PROFILE s3 sync --delete build/ s3://${APP_DOMAIN_NAME}

popd

export CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile $AWS_APP_PROFILE cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${APP_DOMAIN_NAME}\$\")) | .Id")

echo "==> Cloudfront cache invalidation for ${APP_DOMAIN_NAME} distribution ID ${CLOUDFRONT_DISTRIBUTION_ID}"

aws --profile $AWS_APP_PROFILE cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'

echo "==> http://${APP_DOMAIN_NAME}.s3-website-${BUCKET_LOCATION}.amazonaws.com"

echo "==> https://${APP_DOMAIN_NAME}"