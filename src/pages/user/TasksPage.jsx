import { Button, Container, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import Tasks from "../../components/user/Tasks";

const TasksPage = () => {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Link to="/tasks/add">
              <Button color="primary" variant="contained">
                Add Task
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TasksPage;
