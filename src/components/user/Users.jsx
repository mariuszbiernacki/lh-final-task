import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUsers } from "../../actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
});

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(requestUsers());
  }, []);

  console.log(users);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const { email, firstname, id } = user;
            return (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{firstname}</TableCell>
                <TableCell align="right">{email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
