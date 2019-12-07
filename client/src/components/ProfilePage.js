import React, {useState, useEffect} from 'react'
import {inject, observer} from 'mobx-react'
import {API} from 'aws-amplify'
import Spinner from 'react-bootstrap/Spinner'

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

    const profile = <p>Res: {profileData}</p>

    return (
      <>
        <h1>Profile Page</h1>
        <p>Group: {state.groups}</p>
        {profile && !loading ? (
          profile
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </>
    )
  }),
)

export default ProfilePage
