import React, {useState, useEffect} from 'react'
import {inject, observer} from 'mobx-react'
import {API} from 'aws-amplify'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Typography} from '@material-ui/core'

const ProfilePage = inject('state')(
  observer(({state}) => {
    const [loading, setLoading] = useState(true)
    const [profileData, setProfileData] = useState('')

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
      <>
        <Typography variant="h3">Profile Page</Typography>
        <Typography paragraph>Group: {state.groups}</Typography>
        {profile && !loading ? profile : <CircularProgress />}
      </>
    )
  }),
)

export default ProfilePage
