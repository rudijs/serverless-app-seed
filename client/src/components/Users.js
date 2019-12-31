import React, {useEffect} from 'react'

import fetchMachine from '../machines/fetch'
import {useMachine} from '@xstate/react'

import {API} from 'aws-amplify'

function Users() {
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    actions: {
      fetchData: async (ctx, event) => {
        console.log('fetching...')
        console.log(ctx)
        console.log(event)
        // sendToFetchMachine({type: 'RESOLVE', results: 'mi data'})
        // sendToFetchMachine({type: 'REJECT', results: 'mi data'})

        try {
          const res = await API.get('notes', '/user')
          console.log(101, res)
          sendToFetchMachine({type: 'RESOLVE', results: res})
        } catch (e) {
          console.log('error', e)
          sendToFetchMachine({type: 'REJECT', results: e.message})
        }
      },
    },
  })

  useEffect(() => {
    sendToFetchMachine({type: 'FETCH'})
  }, [])

  console.log(fetchState)
  console.log(fetchState.value)

  return (
    <div>
      <h1>Users</h1>
      fetchMachine state: {fetchState.value}
      <br />
      {/* <button onClick={() => sendToFetchMachine({type: 'FETCH'})}>Fetch</button> */}
      {fetchState.matches('pending') ? <p>Loading...</p> : null}
      {fetchState.matches('successful') ? (
        <ol>
          {fetchState.context.results.map((item, index) => (
            <li key={index}>{item.Username}</li>
          ))}
        </ol>
      ) : null}
      {fetchState.matches('failed') ? <p>Fetch failed</p> : null}
    </div>
  )
}

export default Users
