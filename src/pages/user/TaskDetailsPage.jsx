import React from "react";
import { useParams } from "react-router";
import TaskDetails from "../../components/user/TaskDetails";

const TaskDetailsPage = () => {
  const { id } = useParams();

  return <TaskDetails id={id} />;
};

export default TaskDetailsPage;
