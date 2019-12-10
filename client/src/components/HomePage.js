import React from 'react'
import {inject, observer} from 'mobx-react'

import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2),
  },
}))

const HomePage = inject('state')(
  observer(({state}) => {
    const classes = useStyles()
    return (
      <Paper className={classes.root}>
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
