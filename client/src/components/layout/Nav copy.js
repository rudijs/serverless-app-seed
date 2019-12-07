import React from 'react'
import {withRouter} from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Auth} from 'aws-amplify'

const NavBar = inject('state')(
  observer(({state, history}) => {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey={1}>
            <Nav.Item>
              <Nav.Link as={Link} to="/" eventKey={1}>
                Home
              </Nav.Link>
            </Nav.Item>
            {!state.isAuthenticated ? (
              <Nav.Item>
                <Nav.Link as={Link} to="/signin" eventKey={4}>
                  Sign In
                </Nav.Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/dashboard" eventKey={2}>
                    Dashboard
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/profile" eventKey={3}>
                    Profile
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey={4}
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
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }),
)

export default withRouter(NavBar)
