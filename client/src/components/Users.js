import React, {useEffect} from 'react'

import fetchMachine from '../machines/fetch'
import {useMachine} from '@xstate/react'

import {API} from 'aws-amplify'

function Users() {
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
    <div>
      <h1>Users</h1>
      <br />
      <button onClick={() => sendToFetchMachine({type: 'FETCH'})}>Fetch</button>
      {fetchState.matches('pending') ? <p>Loading...</p> : null}
      {fetchState.matches('successful.withData') ? (
        <ol>
          {fetchState.context.results.map((item, index) => (
            <li key={index}>{item.Username}</li>
          ))}
        </ol>
      ) : null}
      {fetchState.matches('successful.withoutData') ? (
        <ol>
          <li>No Data available</li>
        </ol>
      ) : null}
      {fetchState.matches('failed') ? (
        <p>Fetch failed: {fetchState.context.message.message}</p>
      ) : null}
    </div>
  )
}

export default Users
