import React from 'react'
import {inject, observer} from 'mobx-react'

import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2),
    animation: 'fadein 1s',
    '-moz-animation': 'fadein 1s' /* Firefox */,
    '-webkit-animation': 'fadein 1s' /* Safari and Chrome */,
    '-o-animation': 'fadein 1s' /* Opera */,
  },
}))

const HomePage = inject('state')(
  observer(({state}) => {
    const classes = useStyles()
    return (
      <Paper className={classes.paper}>
        <Typography variant="h3">Home Page</Typography>
        <Typography paragraph>Serverless App Seed</Typography>
        <Typography paragraph>
          ReactJS, Serverless Framework, AWS Cognito, S3 and Cloudfront
        </Typography>
      </Paper>
    )
  }),
)

export default HomePage
