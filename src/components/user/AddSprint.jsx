import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addSprint } from "../../actions/actions";

import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import * as Yup from "yup";
import moment from "moment";

const AddSprintSchema = Yup.object().shape({
  startAt: Yup.mixed().required("no starting date provided"),
  endAt: Yup.mixed().required("no starting date provided"),
});

const AddSprint = ({ taskId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        createdAt: parseInt(new Date().getTime() / 1000),
        startAt: new Date(),
        endAt: new Date(),
      }}
      validationSchema={AddSprintSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({
          ...values,
          startAt: moment(values.startAt).unix(),
        });
        const startSprintDate = moment(values.startAt).unix();
        const endSprintDate = moment(values.endAt).unix();
        const newSprint = {
          ...values,
          startAt: startSprintDate,
          endAt: endSprintDate,
        };
        dispatch(addSprint(newSprint, history));
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Start Sprint"
              inputVariant="outlined"
              value={values.startAt}
              name="startAt"
              onChange={(value) =>
                handleChange({
                  target: {
                    value: value,
                    name: "startAt",
                  },
                })
              }
            />
            <DateTimePicker
              label="End Sprint"
              inputVariant="outlined"
              value={values.endAt}
              name="endAt"
              onChange={(value) =>
                handleChange({
                  target: {
                    value: value,
                    name: "endAt",
                  },
                })
              }
            />
          </MuiPickersUtilsProvider>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            add sprint
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSprint;
