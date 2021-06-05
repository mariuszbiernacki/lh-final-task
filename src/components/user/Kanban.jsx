import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestComments, requestTasks } from "../../actions/actions";
import { checkToken } from "../../helpers/auth";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const statuses = ["new", "inprogress", "review", "done"];

const Kanban = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    statuses.forEach((status) => {
      dispatch(
        requestTasks(status + "Tasks", {
          status: status,
        })
      );
    });
  }, []);

  return (
    <div>
      <Grid container>
        {statuses.map((status) => {
          return (
            <Grid item xs={12} md={3}>
              <Typography variant="h6" className={classes.title}>
                {status} tasks:
              </Typography>
              <div className={classes.demo}>
                <List>
                  {tasks[status + "Tasks"].map((task) => {
                    const { id, title, status, createdAt } = task;
                    return (
                      <Link key={id} to={"/tasks/" + id}>
                        <ListItem>
                          <ListItemText
                            primary={title}
                            secondary={
                              <>
                                <span>status: {status}</span>
                                <br />
                                <span>
                                  created:{" "}
                                  <Moment unix format="LL, LT">
                                    {createdAt}
                                  </Moment>
                                </span>
                              </>
                            }
                          />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Kanban;
