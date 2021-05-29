import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import Tasks from "../../components/user/Tasks";

const TasksPage = () => {
  return (
    <>
      <Link to="/tasks/add">
        <Button color="primary" variant="contained">
          Add Task
        </Button>
      </Link>
      <Tasks />
    </>
  );
};

export default TasksPage;
