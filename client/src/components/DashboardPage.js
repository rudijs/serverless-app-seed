import React from 'react'
import {inject, observer} from 'mobx-react'
import Can from './Can'
import {Typography} from '@material-ui/core'

const DashboardPage = inject('state')(
  observer(({state}) => {
    return (
      <>
        <Typography paragraph>Dashboard</Typography>
        <Typography paragraph>Everyone Link</Typography>
        <Can
          role={state.groups}
          // role="admin"
          // role="guest"
          perform="dashboard-page:visit"
          yes={() => <Typography paragraph>Admin Link</Typography>}
        />
      </>
    )
  }),
)

export default DashboardPage
