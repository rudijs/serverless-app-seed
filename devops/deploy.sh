#!/usr/bin/env bash

if [ -z "$REACT_APP_AWS_RJS_GOOGLE_TRACKING_ID" ]; then
      echo "==> INFO: REACT_APP_AWS_RJS_GOOGLE_TRACKING_ID is not set"
fi

export AWS_RJS_PROFILE=default
export AWS_RJS_ENVIRONMENT=${1:-dev}
export AWS_RJS_SUBDOMAIN=${2:-app}
export AWS_RJS_DOMAINNAME=${3:-rudijs.com}
export RJS_DOMAIN_NAME="${AWS_RJS_ENVIRONMENT}-${AWS_RJS_SUBDOMAIN}.${AWS_RJS_DOMAINNAME}"
BUCKET_LOCATION=$(aws --profile $AWS_RJS_PROFILE s3api get-bucket-location --bucket dev-app.rudijs.com | jq -r  .LocationConstraint)

echo "==> Building $RJS_DOMAIN_NAME"

pushd ../client

npm run build

echo "==> Deploying to AWS S3 ${RJS_DOMAIN_NAME}"

aws --profile $AWS_RJS_PROFILE s3 sync --delete build/ s3://${RJS_DOMAIN_NAME}

popd

export CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile $AWS_RJS_PROFILE cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${RJS_DOMAIN_NAME}\$\")) | .Id")

echo "==> Cloudfront cache invalidation for ${RJS_DOMAIN_NAME} distribution ID ${CLOUDFRONT_DISTRIBUTION_ID}"

aws --profile $AWS_RJS_PROFILE cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'

echo "==> http://${RJS_DOMAIN_NAME}.s3-website-${BUCKET_LOCATION}.amazonaws.com"

echo "==> https://${RJS_DOMAIN_NAME}"