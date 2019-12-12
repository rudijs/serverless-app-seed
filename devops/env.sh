#!/bin/bash

if ! [ -x "$(command -v aws)" ]; then
  echo '==> Error: aws CLI not installed.' >&2
  else

  # export AWS_APP_PROFILE=${1:-default}
  export AWS_APP_PROFILE=default

  export AWS_APP_ENVIRONMENT=${1:-dev}
  export AWS_APP_SUBDOMAIN=${2:-app}
  export AWS_APP_DOMAINNAME=${3:-rudijs.com}
  export AWS_APP_CERTIFICATE_REGION=${4:-us-east-1}
  # export AWS_APP_DOMAIN_NAME="${AWS_APP_ENVIRONMENT}-${AWS_APP_SUBDOMAIN}.${AWS_APP_DOMAINNAME}"
  # export AWS_APP_HOSTEDZONEID=$(aws route53 list-hosted-zones | jq -r ".HostedZones[] | select(.Name | match(\"$AWS_APP_DOMAINNAME\")) | .Id" | sed -e 's/\/hostedzone\///')
  export AWS_APP_ACMCERTIFICATEARN=$(aws --profile $AWS_APP_PROFILE --region $AWS_APP_CERTIFICATE_REGION acm list-certificates | jq -r ".CertificateSummaryList[] | select(.DomainName | match(\"$AWS_APP_DOMAINNAME\")) | .CertificateArn")

  env | grep AWS_APP | sort

fi