import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'mobx-react'
import {state} from './models/clientState'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider state={state}>
      <App />
    </Provider>,
    div,
  )
  ReactDOM.unmountComponentAtNode(div)
})
