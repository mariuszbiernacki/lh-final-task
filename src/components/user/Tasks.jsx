import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTasks } from "../../actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});

const Tasks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(requestTasks("tasks", {}));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">User Id</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => {
            const { createdAt, id, status, title, userId } = task;
            return (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{status}</TableCell>
                <TableCell align="right">{title}</TableCell>
                <TableCell align="right">{userId}</TableCell>
                <TableCell align="right">
                  <Moment unix format="LL, LT">
                    {createdAt}
                  </Moment>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tasks;
