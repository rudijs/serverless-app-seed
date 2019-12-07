import React from 'react'
import {inject, observer} from 'mobx-react'
import Can from './Can'

const DashboardPage = inject('state')(
  observer(({state}) => {
    return (
      <>
        <p>Dashboard</p>
        <p>Everyone Link</p>
        <Can
          role={state.groups}
          // role="admin"
          // role="guest"
          perform="dashboard-page:visit"
          yes={() => (
            <div>
              <p>Admin Link</p>
            </div>
          )}
        />
      </>
    )
  }),
)

export default DashboardPage
