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

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.tasks.myTasks);
  const newTasks = useSelector((state) => state.tasks.newTasks);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    const decodedToken = checkToken();

    if (!decodedToken) {
      return;
    }

    dispatch(requestTasks("myTasks", { userId: decodedToken.sub }));
    dispatch(
      requestTasks("newTasks", {
        _sort: "createdAt",
        _order: "desc",
        _start: 0,
        _limit: 5,
      })
    );
    dispatch(
      requestComments({
        _sort: "createdAt",
        _order: "desc",
        _start: 0,
        _limit: 2,
      })
    );
  }, []);

  console.log(myTasks);
  console.log(newTasks);
  console.log(comments);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.title}>
            My Tasks List
          </Typography>
          <div className={classes.demo}>
            <List>
              {myTasks.map((task) => {
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

        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.title}>
            New Tasks List
          </Typography>
          <div className={classes.demo}>
            <List>
              {newTasks.map((task) => {
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

        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={classes.title}>
            New Comments
          </Typography>
          <div className={classes.demo}>
            <List>
              {comments.map((comment) => {
                const { id, taskId, content, createdAt } = comment;
                return (
                  <ListItem key={id}>
                    <ListItemText
                      primary={content}
                      secondary={
                        <>
                          <span>commented task: {taskId}</span>
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
                );
              })}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
