import React from "react";
import { useParams } from "react-router";
import AddComment from "../../components/user/AddComment";

const AddCommentPage = () => {
  const { id } = useParams();
  return <AddComment taskId={id} />;
};

export default AddCommentPage;
