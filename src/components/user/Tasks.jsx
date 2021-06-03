import React, { useEffect, useRef, useState } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Moment from "react-moment";
import { Button, TableSortLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 960,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("desc");

  const [status, setStatus] = useState("");
  const [searchBy, setSearchBy] = useState("userId");
  const [values, setValues] = useState({});

  const handleSearchChange = (e) => {
    setSearchBy(e.target.value);
  };
  const searchInput = useRef(null);

  useEffect(() => {
    if (!searchInput.current) {
      return;
    }
    searchInput.current.focus();
  }, [searchBy, searchInput.current]);

  useEffect(() => {
    dispatch(
      requestTasks("tasks", {
        _sort: orderBy,
        _order: order,
        ...values,
      })
    );
  }, [orderBy, order, values]);

  const changeOrder = (newOrderBy) => {
    if (orderBy === newOrderBy) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setOrderBy(newOrderBy);
      setOrder("desc");
    }
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Search</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={searchBy}
          onChange={handleSearchChange}
          label="Search"
        >
          <MenuItem value="">
            <em>Search: </em>
          </MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"status"}>Status</MenuItem>
          <MenuItem value={"userId"}>User Id</MenuItem>
        </Select>
      </FormControl>

      <Formik
        initialValues={{ title: "", status: "", userId: "" }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);
          setValues({
            [searchBy]: values[searchBy],
          });
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            {searchBy === "title" ? (
              <input
                placeholder="title"
                name="title"
                type="text"
                ref={searchInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                required={true}
              />
            ) : searchBy === "status" ? (
              <FormControl variant="outlined" className={classes.formControl}>
                <select
                  name="status"
                  value={status}
                  onChange={handleChange}
                  ref={searchInput}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                  required={true}
                >
                  <option value="">Status:</option>
                  <option value={"new"}>New</option>
                  <option value={"inprogress"}>Inprogress</option>
                  <option value={"review"}>Review</option>
                  <option value={"done"}>Done</option>
                </select>
              </FormControl>
            ) : (
              <input
                placeholder="userId"
                name="userId"
                type="text"
                ref={searchInput}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userId}
                required={true}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              search
            </Button>
          </Form>
        )}
      </Formik>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell
                align="right"
                sortDirection={orderBy === "userId" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "userId"}
                  direction={orderBy === "userId" ? order : "asc"}
                  onClick={() => changeOrder("userId")}
                >
                  User Id
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Sprint Id</TableCell>
              <TableCell
                align="right"
                sortDirection={orderBy === "createdAt" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "createdAt"}
                  direction={orderBy === "createdAt" ? order : "asc"}
                  onClick={() => changeOrder("createdAt")}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              const { createdAt, id, status, title, userId, sprintId } = task;
              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{title}</TableCell>
                  <TableCell align="right">
                    {userId ? userId : "no user selected"}
                  </TableCell>
                  <TableCell align="right">
                    {sprintId ? sprintId : "no sprint selected"}
                  </TableCell>
                  <TableCell align="right">
                    <Moment unix format="LL, LT">
                      {createdAt}
                    </Moment>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={"/tasks/" + id}>
                      <Button type="button" variant="contained" color="primary">
                        Task Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tasks;
