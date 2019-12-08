import React from 'react'
import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {Auth} from 'aws-amplify'

// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import StarIcon from '@material-ui/icons/Star'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}))

// export default function ButtonAppBar() {
const NavBar = inject('state')(
  observer(({state, history}) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = () => event => {
      console.log('toggleDrawer')

      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return
      }

      setOpen(!open)
    }

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              history.push('/dashboard')
            }}
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/profile')
            }}
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/">Home</Link>
            </Typography>
            {!state.isAuthenticated ? (
              <Button component={Link} to={'/signin'} color="inherit">
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={async () => {
                    try {
                      await Auth.signOut()
                    } catch (e) {
                      console.log(e)
                    } finally {
                      state.setGroup('guest')
                      history.push('/')
                    }
                  }}
                >
                  Sign Out
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer()}>
          {sideList('left')}
        </Drawer>
      </div>
    )
  }),
)

export default withRouter(NavBar)
