import React, {useEffect} from 'react'

import fetchMachine from '../machines/fetch'
import {useMachine} from '@xstate/react'

import {API} from 'aws-amplify'

import {makeStyles} from '@material-ui/core/styles'
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    animation: 'fadein 1s',
    '-moz-animation': 'fadein 1s' /* Firefox */,
    '-webkit-animation': 'fadein 1s' /* Safari and Chrome */,
    '-o-animation': 'fadein 1s' /* Opera */,
  },
}))

function Users() {
  const classes = useStyles()
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: async () => await API.get('notes', '/user'),
    },
  })

  useEffect(() => {
    sendToFetchMachine({type: 'FETCH'})
  }, [sendToFetchMachine])

  // console.log(JSON.stringify(fetchState.context, null, 2))
  // console.log(fetchState.value)

  return (
    <Box mr="auto">
      <Paper className={classes.paper}>
        <Typography variant="h3">Users Page</Typography>

        <br />

        {fetchState.matches('failed') ? (
          <Typography color="error">
            {fetchState.context.message.message}
          </Typography>
        ) : null}
        {/* <button onClick={() => sendToFetchMachine({type: 'FETCH'})}> */}
        {/* Fetch */}
        {/* </button> */}
        {fetchState.matches('pending') ? <CircularProgress /> : null}
        {fetchState.matches('successful.withData') ? (
          <List>
            {fetchState.context.results.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.Username} />
              </ListItem>
            ))}
          </List>
        ) : null}
        {fetchState.matches('successful.withoutData') ? (
          <Typography>No data available</Typography>
        ) : null}
      </Paper>
    </Box>
  )
}

export default Users
