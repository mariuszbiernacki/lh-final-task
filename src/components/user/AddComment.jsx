import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addComment } from "../../actions/actions";
import { checkToken } from "../../helpers/auth";
import * as Yup from "yup";
const AddCommentSchema = Yup.object().shape({
  content: Yup.string().required("no content provided"),
});

const AddComment = ({ taskId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const decodedToken = checkToken();

    if (!decodedToken) {
      return;
    }
    setUserId(decodedToken.sub);
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        content: "",
        userId: parseInt(userId),
        taskId: parseInt(taskId),
        createdAt: parseInt(new Date().getTime() / 1000),
      }}
      validationSchema={AddCommentSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addComment(values, history));
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
          <TextareaAutosize
            aria-label="comment textarea"
            rowsMin={10}
            label="content"
            name="content"
            type="text"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
            error={Boolean(errors.content)}
            required={true}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            add comment
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddComment;
