const AWS = require('aws-sdk')

AWS.config.region = 'todo'

const cognito = new AWS.CognitoIdentityServiceProvider()

let params = {
  AuthFlow: 'ADMIN_NO_SRP_AUTH',
  ClientId: 'todo',
  UserPoolId: 'todo',
  AuthParameters: {
    USERNAME: 'todo7b0c74f-1934-4d78-98c4-7c20acertfbc',
    PASSWORD: 'todo',
  },
}

cognito
  .adminInitiateAuth(params)
  .promise()
  .then(res => console.log('res', res))
  .catch(err => console.log('err', err))
