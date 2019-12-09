import React from 'react'
import {inject, observer} from 'mobx-react'

import {Typography} from '@material-ui/core'

const HomePage = inject('state')(
  observer(({state}) => {
    return (
      <>
        <Typography variant="h3">Home Page</Typography>
        <Typography paragraph>Serverless App Seed</Typography>
        <Typography paragraph>
          ReactJS, Serverless Framework, AWS Cognito, S3 and Cloudfront
        </Typography>
      </>
    )
  }),
)

export default HomePage
