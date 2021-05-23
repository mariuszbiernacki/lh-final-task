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

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("no name provided"),
  email: Yup.string().email("Invalid email").required("no e-mail provided"),
  password: Yup.string()
    .required("No password provided.")
    .min(7, "Password is too short - should be 7 chars minimum.")
    .matches(/[a-zA-Z][0-9]/, "Password should contain letters and numbers."),
});

const RegisterForm = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ firstname: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        authApi
          .register(values)
          .then((response) => {
            const { status } = response;

            if (status === 201) {
              alert("Account has been created. You can login now!");
            }
          })
          .catch((error) => {
            const { response } = error;
            const { status } = response;

            if (status === 400) {
              alert("e-mail exists");
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
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
            label="first name"
            name="firstname"
            type="text"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
            required={true}
          />

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
            register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
