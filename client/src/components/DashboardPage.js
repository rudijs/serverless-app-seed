import React from 'react'
import {inject, observer} from 'mobx-react'
import Can from './Can'

import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
}))

const DashboardPage = inject('state')(
  observer(({state}) => {
    const classes = useStyles()

    return (
      <Box mx="auto">
        <Paper className={classes.paper}>
          <Typography variant="h3">Dashboard</Typography>
          <Typography paragraph>Everyone Link</Typography>
          <Can
            role={state.groups}
            // role="admin"
            // role="guest"
            perform="dashboard-page:visit"
            yes={() => <Typography paragraph>Admin Link</Typography>}
          />
        </Paper>
      </Box>
    )
  }),
)

export default DashboardPage
