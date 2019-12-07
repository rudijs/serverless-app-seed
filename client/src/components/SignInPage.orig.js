import React, {useState} from 'react'
import {inject, observer} from 'mobx-react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Auth} from 'aws-amplify'

const SignInPage = inject('state')(
  observer(({state, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
      return email.length > 0 && password.length > 0
    }

    async function handleSubmit(event) {
      event.preventDefault()

      // setIsLoading(true);

      try {
        await Auth.signIn(email, password)

        // const currentUserInfo = await Auth.currentUserInfo();
        // console.log(101, currentUserInfo);

        const currentSession = await Auth.currentSession()
        // console.log(201, currentSession.isValid());
        // console.log(301, currentSession.getIdToken());
        // console.log(401, currentSession.getIdToken().payload.email);
        // console.log(501, currentSession.getIdToken().payload["cognito:groups"]);

        // state.setGroup("admin");
        const groups = currentSession.getIdToken().payload['cognito:groups']
        if (groups) {
          state.setGroup(groups[0])
        }

        history.push('/dashboard')
      } catch (e) {
        console.log(901, e)
        alert(e.message)
        // setIsLoading(false);
      }
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    )
  }),
)

export default SignInPage
