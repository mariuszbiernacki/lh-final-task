import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import apiUsers from "../../api/users";
import { useDispatch } from "react-redux";
import { addTask } from "../../actions/actions";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

// userId createdAt id	status	title

const AddTaskSchema = Yup.object().shape({
  title: Yup.string().required("no title provided"),
  status: Yup.string().required("status shoud be set"),
});

const AddTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    apiUsers.getAll().then((response) => {
      const { data } = response;
      setUsers(data);
    });
  }, []);
  return (
    <Formik
      initialValues={{
        title: "",
        status: "new",
        userId: null,
        createdAt: new Date().getTime() / 1000,
      }}
      validationSchema={AddTaskSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addTask(values, history));
        setSubmitting(false);
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
        <Form onSubmit={handleSubmit}>
          <TextField
            label="title"
            name="title"
            type="title"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            error={Boolean(errors.title)}
            required={true}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="userId">Users</InputLabel>
            <Select
              name="userId"
              id="userId"
              value={values.userId}
              onChange={handleChange}
              onBlur={handleBlur}
              label="User Id"
            >
              <MenuItem value={null}>
                <em>No user selected</em>
              </MenuItem>
              {users.map((user) => (
                <MenuItem value={user.id}>{user.firstname}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            add task
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask;
