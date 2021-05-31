import { Button } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import TaskDetails from "../../components/user/TaskDetails";

const TaskDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <TaskDetails id={id} />
      <Link to={`/tasks/${id}/comments/add`}>
        <Button type="button" variant="contained" color="primary">
          add comment
        </Button>
      </Link>
      <Link to={`/tasks/${id}/edit`}>
        <Button type="button" variant="contained" color="primary">
          edit task
        </Button>
      </Link>
    </>
  );
};

export default TaskDetailsPage;
