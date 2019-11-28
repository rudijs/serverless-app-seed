import React from "react";
import { inject, observer } from "mobx-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as FormB, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";

const SignInPage = inject("state")(
  observer(({ state, history }) => {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Must be 6 to 12 characters in length")
            .max(12, "Must be 6 to 12 characters in length")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));

          const { email, password } = values;

          try {
            await Auth.signIn(email, password);

            // const currentUserInfo = await Auth.currentUserInfo();
            // console.log(101, currentUserInfo);

            const currentSession = await Auth.currentSession();
            // console.log(201, currentSession.isValid());
            // console.log(301, currentSession.getIdToken());
            // console.log(401, currentSession.getIdToken().payload.email);
            // console.log(501, currentSession.getIdToken().payload["cognito:groups"]);

            // state.setGroup("admin");
            const groups = currentSession.getIdToken().payload["cognito:groups"];
            if (groups) {
              state.setGroup(groups[0]);
            }

            history.push("/dashboard");
          } catch (e) {
            console.log(901, e);
            alert(e.message);
            setSubmitting(false);
          } finally {
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormB.Group>
              <FormB.Label>Email Address</FormB.Label>
              <Field as={FormB.Control} name="email" type="email" />
              <ErrorMessage name="email" />
            </FormB.Group>

            <FormB.Group>
              <FormB.Label>Password</FormB.Label>
              <Field as={FormB.Control} name="password" type="password" />
              <ErrorMessage name="password" />
            </FormB.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    );
  })
);

export default SignInPage;
