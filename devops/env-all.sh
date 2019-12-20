#!/bin/bash

if ! [ -x "$(command -v aws)" ]; then
  echo '==> Error: aws CLI not installed.' >&2
  else
  source ./env.sh
  source ./env-cognito.sh
  source ./env-serverless.sh
  source ./env-react.sh
fi