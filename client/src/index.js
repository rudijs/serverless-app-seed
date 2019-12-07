import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker'

import App from './App'
import {Provider} from 'mobx-react'
import {state} from './models/clientState'

import Amplify, {Auth} from 'aws-amplify'
import config from './config'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'notes',
        region: config.apiGateway.REGION,
        endpoint: config.apiGateway.URL,
        // endpoint: "https://yc609d159e.execute-api.ap-southeast-1.amazonaws.com/dev",
        // region: "ap-southeast-1"
      },
    ],
  },
})

// We want an async function to run before any routes or rendering.
// The async action is an AWS Amplify session lookup.
// We want to complete this lookup before any routes load as the private routes will check for an amplify session.
// Wrapping the ReactDOM.render() in this async function is the only way I found so far to achieve this.
// If we don't do this here, on a page refresh a signed in user will be redirected to sign in if they reload on a private route.
// This is because the routes load before the async session lookup finishes.
async function onLoad() {
  try {
    const currentSession = await Auth.currentSession()
    const groups = currentSession.getIdToken().payload['cognito:groups']
    if (groups) {
      state.setGroup(groups[0])
    }
  } catch (e) {
    if (e !== 'No current user') {
      alert(e)
    }
  }

  ReactDOM.render(
    <Provider state={state}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}

onLoad()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
