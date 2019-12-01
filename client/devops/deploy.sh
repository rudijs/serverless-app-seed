#!/usr/bin/env bash

export AWS_RJS_PROFILE=default

export AWS_RJS_ENVIRONMENT=${1:-dev}
export AWS_RJS_SUBDOMAIN=${2:-app}
export AWS_RJS_DOMAINNAME=${3:-rudijs.com}
export RJS_DOMAIN_NAME="${AWS_RJS_ENVIRONMENT}-${AWS_RJS_SUBDOMAIN}.${AWS_RJS_DOMAINNAME}"

echo "==> Building $RJS_DOMAIN_NAME"

pushd ..

npm run build

echo "==> Deploying to AWS S3 ${RJS_DOMAIN_NAME}"

aws --profile $AWS_RJS_PROFILE s3 sync --delete build/ s3://${RJS_DOMAIN_NAME}

popd

export CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile $AWS_RJS_PROFILE cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${RJS_DOMAIN_NAME}\$\")) | .Id")

echo "==> Cloudfront cache invalidation for ${RJS_DOMAIN_NAME} distribution ID ${CLOUDFRONT_DISTRIBUTION_ID}"

aws --profile $AWS_RJS_PROFILE cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'