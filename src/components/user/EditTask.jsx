import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { requestTask, updateTask } from "../../actions/actions";
import * as Yup from "yup";
import apiUsers from "../../api/users";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const UpdateTaskSchema = Yup.object().shape({
  //
});

const EditTask = ({ taskId }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  useEffect(() => {
    apiUsers.getAll().then((response) => {
      const { data } = response;
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    dispatch(requestTask(taskId));
  }, [taskId]);

  if (!selectedTask) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        userId: selectedTask.userId,
      }}
      validationSchema={UpdateTaskSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateTask(taskId, values));
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
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
            approve changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditTask;
