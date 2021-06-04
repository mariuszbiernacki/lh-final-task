import React, { useEffect } from "react";
import { useSprint } from "../../helpers/customHooks";
import Moment from "react-moment";
import { Button, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { requestTasks, updateTask } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

const SprintDetails = ({ id }) => {
  const sprintlessTasks = useSelector((state) => state.tasks.sprintlessTasks);
  const selectedSprint = useSprint(id);
  const dispatch = useDispatch();

  const reloadTasks = () => {
    dispatch(requestTasks("sprintlessTasks", { sprintId: 0 }));
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  const handleUpdateTask = (taskId, unsetSprintId = false) => {
    dispatch(
      updateTask(taskId, {
        sprintId: unsetSprintId ? 0 : parseInt(id),
      })
    );
  };

  if (!selectedSprint) {
    return null;
  }
  const { tasks, createdAt, startAt, endAt } = selectedSprint;

  return (
    <>
      <div>
        <p>
          created at:{" "}
          <Moment unix format="LL, LT">
            {createdAt}
          </Moment>
        </p>
        <p>
          start at:{" "}
          <Moment unix format="LL, LT">
            {startAt}
          </Moment>
        </p>
        <p>
          end at:{" "}
          <Moment unix format="LL, LT">
            {endAt}
          </Moment>
        </p>
      </div>

      <Grid container>
        <Grid item xs={12} md={4}>
          <h2>Sprint Tasks: </h2>
          <List>
            {tasks &&
              tasks.map((task) => {
                const { id, title, userId, status } = task;
                return (
                  <ListItem key={id}>
                    <ListItemText
                      primary={title}
                      secondary={
                        <>
                          <span>status: {status}</span>
                          <br />
                          <span>userId: {userId}</span>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => handleUpdateTask(id, true)}
                          >
                            remove
                          </Button>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </Grid>

        <Grid item xs={12} md={4}>
          <h2>Free Tasks: </h2>
          <List>
            {sprintlessTasks &&
              sprintlessTasks.map((task) => {
                const { id, title, userId, status } = task;
                return (
                  <ListItem key={id}>
                    <ListItemText
                      primary={title}
                      secondary={
                        <>
                          <span>status: {status}</span>
                          <br />
                          <span>userId: {userId}</span>
                          <br />
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleUpdateTask(id)}
                          >
                            Add to sprint
                          </Button>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default SprintDetails;
