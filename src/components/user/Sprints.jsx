import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import { Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestSprints } from "../../actions/actions";

const styles = (theme) => ({
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
});

class Sprints extends Component {
  componentDidMount() {
    this.props.requestSprints();
  }

  render() {
    const { classes } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Start At</TableCell>
              <TableCell align="right">End At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.sprints &&
              this.props.sprints.map((sprint) => {
                const { createdAt, id, startAt, endAt } = sprint;
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="right">
                      <Moment unix format="LL, LT">
                        {createdAt}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Moment unix format="LL, LT">
                        {startAt}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Moment unix format="LL, LT">
                        {endAt}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={"/sprints/" + id}>
                        <Button
                          type="button"
                          variant="contained"
                          color="primary"
                        >
                          Sprint Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Link to={"/sprints/add"}>
          <Button type="button" variant="contained" color="primary">
            Add Sprint
          </Button>
        </Link>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  sprints: state.sprints.sprints,
});

const mapDispatchToProps = (dispatch) => ({
  requestSprints: (params) => dispatch(requestSprints(params)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Sprints)
);
