#!/usr/bin/env bash

DOMAIN_NAME="${AWS_RJS_ENVIRONMENT}-${AWS_RJS_SUBDOMAIN}.${AWS_RJS_DOMAINNAME}"

echo "==> Building $DOMAIN_NAME"

pushd ..

npm run build

echo "==> Deploying to AWS S3 ${DOMAIN_NAME}"

aws --profile $AWS_RJS_PROFILE s3 sync --delete build/ s3://${DOMAIN_NAME}

popd

# export CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile $AWS_RJS_PROFILE cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${DOMAIN_NAME}\$\")) | .Id")

# echo "==> Cloudfront cache invalidation for ${DOMAIN_NAME} distribution ID ${CLOUDFRONT_DISTRIBUTION_ID}"

# aws --profile kbs cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'