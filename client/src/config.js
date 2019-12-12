export default {
  s3: {
    REGION: 'YOUR_S3_UPLOADS_BUCKET_REGION',
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME',
  },
  apiGateway: {
    REGION: process.env.REACT_APP_AWS_APP_COGNITO_REGION,
    URL: process.env.REACT_APP_AWS_APP_SERVICE_ENDPOINT,
  },
  cognito: {
    REGION: process.env.REACT_APP_AWS_APP_COGNITO_REGION,
    USER_POOL_ID: process.env.REACT_APP_AWS_APP_COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_AWS_APP_COGNITO_APP_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_AWS_APP_COGNITO_IDENTITY_POOL_ID,
    // REGION: "ap-southeast-1",
    // USER_POOL_ID: "ap-southeast-1_3Ka2Gk8BK",
    // APP_CLIENT_ID: "4gd43v5rg5f1vummad0nna5pql",
    // IDENTITY_POOL_ID: "ap-southeast-1:20ed8f70-f7fb-479c-9e32-3cca5a0b7438"
  },
  googleAnalytics: {
    trackingId: process.env.REACT_APP_AWS_APP_GOOGLE_TRACKING_ID,
  },
}
