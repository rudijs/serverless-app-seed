#!/usr/bin/env bash

echo "==> Building $SSV_DOMAIN_NAME"

pushd .. 

npm run build

echo "==> Deploying to AWS S3 ${SSV_DOMAIN_NAME}"

aws s3 sync --delete build/ s3://${SSV_DOMAIN_NAME}

popd

export CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${SSV_DOMAIN_NAME}\$\")) | .Id")

echo "==> Cloudfront cache invalidation for ${SSV_DOMAIN_NAME} distribution ID $CLOUDFRONT_DISTRIBUTION_ID"

aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'