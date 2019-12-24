import React, {useState, useEffect} from 'react'
import {inject, observer} from 'mobx-react'
import {API} from 'aws-amplify'

import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

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

const ProfilePage = inject('state')(
  observer(({state}) => {
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState('')
    const classes = useStyles()

    useEffect(() => {
      async function getToken() {
        try {
          const res = await API.get('notes', '/notes')
          setProfileData(res.message)
        } catch (e) {
          console.log('error', e)
          setProfileData(e.message)
        } finally {
          setLoading(false)
        }
        // const token = await API.post("notes", "/notes", {
        // body: { foo: "bar" }
        // });
      }
      getToken()
    }, [])

    const profile = <Typography paragraph>Res: {profileData}</Typography>

    return (
      <Box mr="auto">
        <Paper className={classes.paper}>
          <Typography variant="h3">Profile Page</Typography>
          <Typography paragraph>Group: {state.groups}</Typography>
          {profile && !loading ? profile : <CircularProgress />}
        </Paper>
      </Box>
    )
  }),
)

export default ProfilePage
