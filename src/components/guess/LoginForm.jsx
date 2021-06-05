import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authApi from "../../api/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("no e-mail provided"),
  password: Yup.string().required("No password provided."),
});

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        authApi
          .login(values)
          .then((response) => {
            const { status, data } = response;

            if (status === 200) {
              localStorage.setItem("access-token", data.accessToken);
              window.location.href = "/";
            }
          })
          .catch((error) => {
            const { response } = error;
            const { status } = response;

            if (status === 400) {
              alert("wrong details");
            }
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form className={classes.root} onSubmit={handleSubmit} noValidate>
          <TextField
            label="email"
            name="email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required={true}
          />
          <TextField
            label="password"
            name="password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={Boolean(errors.password)}
            helperText={errors.password}
            required={true}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
