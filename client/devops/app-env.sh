#!/bin/bash

# export AWS_RJS_PROFILE=${1:-default}
export AWS_RJS_PROFILE=default

export AWS_RJS_ENVIRONMENT=${1:-dev}
export AWS_RJS_SUBDOMAIN=${2:-app}
export AWS_RJS_DOMAINNAME=${3:-rudijs.com}
export AWS_RJS_CERTIFICATE_REGION=${4:-us-east-1}
export RJS_DOMAIN_NAME="${AWS_ENVIRONMENT}-${AWS_SUBDOMAIN}.${AWS_DOMAINNAME}"
export AWS_RJS_HOSTEDZONEID=$(aws route53 list-hosted-zones | jq -r ".HostedZones[] | select(.Name | match(\"$AWS_RJS_DOMAINNAME\")) | .Id" | sed -e 's/\/hostedzone\///')
export AWS_RJS_ACMCERTIFICATEARN=$(aws --profile $AWS_RJS_PROFILE --region $AWS_RJS_CERTIFICATE_REGION acm list-certificates | jq -r ".CertificateSummaryList[] | select(.DomainName | match(\"$AWS_RJS_DOMAINNAME\")) | .CertificateArn")

env | grep AWS_RJS | sort