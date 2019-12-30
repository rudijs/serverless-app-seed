## VPC

aws cloudformation create-stack --stack-name app-seed-vpc-dev --template-body file://vpc-stack.yaml

aws cloudformation update-stack --stack-name app-seed-vpc-dev --template-body file://vpc-stack.yaml

aws cloudformation delete-stack --stack-name app-seed-vpc-dev
