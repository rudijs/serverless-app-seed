import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {Form as FormB, Button} from 'react-bootstrap'

const SignInPage = () => {
  return (
    <Formik
      initialValues={{firstName: '', lastName: '', email: ''}}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({isSubmitting}) => (
        <Form>
          <FormB.Group>
            <FormB.Label>First Name</FormB.Label>
            <Field as={FormB.Control} name="firstName" type="text" />
            <ErrorMessage name="firstName" />
          </FormB.Group>

          <FormB.Group>
            <FormB.Label>Last Name</FormB.Label>
            <Field as={FormB.Control} name="lastName" type="text" />
            <ErrorMessage name="lastName" />
          </FormB.Group>

          <FormB.Group>
            <FormB.Label>Email Address</FormB.Label>
            <Field as={FormB.Control} name="email" type="email" />
            <ErrorMessage name="email" />
          </FormB.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignInPage
