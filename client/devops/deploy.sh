#!/usr/bin/env bash

if [ -z "$RJS_DOMAIN_NAME" ]; then
      echo "==> ERROR: RJS_DOMAIN_NAME is not set"
      exit 1
fi

if [ -z "$AWS_RJS_PROFILE" ]; then
      echo "==> ERROR: AWS_RJS_PROFILE is not set"
      exit 1
fi

echo "==> Building $RJS_DOMAIN_NAME"

pushd ..

npm run build

echo "==> Deploying to AWS S3 ${RJS_DOMAIN_NAME}"

aws --profile $AWS_RJS_PROFILE s3 sync --delete build/ s3://${RJS_DOMAIN_NAME}

popd

export CLOUDFRONT_DISTRIBUTION_ID=$(aws --profile $AWS_RJS_PROFILE cloudfront list-distributions | jq -r ".DistributionList.Items[] | select(.Aliases.Items[0] | match(\"^${RJS_DOMAIN_NAME}\$\")) | .Id")

echo "==> Cloudfront cache invalidation for ${RJS_DOMAIN_NAME} distribution ID ${CLOUDFRONT_DISTRIBUTION_ID}"

aws --profile $AWS_RJS_PROFILE cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'