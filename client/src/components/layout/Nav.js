import React from 'react'
import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {Auth} from 'aws-amplify'

import {makeStyles} from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  // '@global': {
  //   margin: 0,
  // },
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
  button: {
    '&:hover, &:focus': {
      background: 'black',
      color: '#FFF',
    },
  },
}))

// export default function ButtonAppBar() {
const NavBar = inject('state')(
  observer(({state, history, location}) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = () => event => {
      if (
        event &&
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
          {!state.isAuthenticated ? (
            <ListItem
              button
              selected={location.pathname === '/signin'}
              onClick={() => {
                history.push('/signin')
              }}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          ) : (
            <>
              <ListItem
                button
                selected={location.pathname === '/dashboard'}
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
                selected={location.pathname === '/profile'}
                onClick={() => {
                  history.push('/profile')
                }}
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{margin: 0}}>
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
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => {
                history.push('/')
              }}
            >
              Home
            </Typography>
            {!state.isAuthenticated ? (
              <Button
                component={Link}
                to={'/signin'}
                color="inherit"
                className={classes.button}
              >
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
        <SwipeableDrawer
          open={open}
          onOpen={toggleDrawer()}
          onClose={toggleDrawer()}
        >
          {sideList('left')}
        </SwipeableDrawer>
      </div>
    )
  }),
)

export default withRouter(NavBar)
