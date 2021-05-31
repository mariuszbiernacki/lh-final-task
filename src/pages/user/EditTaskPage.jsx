import React from "react";
import { useParams } from "react-router";
import EditTask from "../../components/user/EditTask";

const EditTaskPage = () => {
  const { id } = useParams();
  return <EditTask taskId={id} />;
};

export default EditTaskPage;
