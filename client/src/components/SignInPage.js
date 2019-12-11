import React from 'react'
import {inject, observer} from 'mobx-react'

import {Formik, Field, Form} from 'formik'
import * as Yup from 'yup'
import {Auth} from 'aws-amplify'

import {makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import {Typography} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// todo: redirect if already signed in

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  progresStyle: {
    marginLeft: '1rem',
    color: 'blue',
  },
  formInput: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
}))

const SignInPage = inject('state')(
  observer(({state, history}) => {
    const classes = useStyles()

    return (
      <Box className={classes.container} mx="auto">
        <Paper className={classes.paper}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, 'Must be 6 to 12 characters in length')
                .max(12, 'Must be 6 to 12 characters in length')
                .required('Required'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            })}
            onSubmit={async (values, {setSubmitting}) => {
              // alert(JSON.stringify(values, null, 2));

              const {email, password} = values

              try {
                await Auth.signIn(email, password)

                // const currentUserInfo = await Auth.currentUserInfo();
                // console.log(101, currentUserInfo);

                const currentSession = await Auth.currentSession()
                // console.log(201, currentSession.isValid());
                // console.log(301, currentSession.getIdToken());
                // console.log(301, currentSession.getIdToken().getJwtToken());
                // console.log(401, currentSession.getIdToken().payload.email);
                // console.log(501, currentSession.getIdToken().payload["cognito:groups"]);

                // state.setGroup("admin");
                const groups = currentSession.getIdToken().payload[
                  'cognito:groups'
                ]
                if (groups) {
                  state.setGroup(groups[0])
                }

                history.push('/dashboard')
              } catch (e) {
                console.log(901, e)
                alert(e.message)
                setSubmitting(false)
              }
            }}
          >
            {({isSubmitting, errors, touched}) => {
              return (
                <Form>
                  <Typography variant="h3">Sign In</Typography>

                  <Field
                    type="email"
                    className={classes.formInput}
                    name="email"
                    as={TextField}
                    label="Email Address"
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <br />

                  <Field
                    type="password"
                    className={classes.formInput}
                    name="password"
                    as={TextField}
                    label="Password"
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && Boolean(errors.password)}
                  />

                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      className={classes.formInput}
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Sign In
                      {isSubmitting && (
                        <CircularProgress
                          size="1rem"
                          className={classes.progresStyle}
                        />
                      )}
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </Paper>
      </Box>
    )
  }),
)

export default SignInPage
