import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../../styles/navbar.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const logOut = () => {
    localStorage.removeItem("access-token");
    window.location.href = "/";
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="navbar">
            <Typography variant="h6" className={classes.title}>
              LH Final Task
            </Typography>
            <Link className="navbar__item" to="/">
              <Button type="button" color="inherit">
                Home
              </Button>
            </Link>

            <Link className="navbar__item" to="/tasks">
              <Button type="button" color="inherit">
                Tasks
              </Button>
            </Link>

            <Link className="navbar__item" to="/users">
              <Button type="button" color="inherit">
                Users
              </Button>
            </Link>

            <Link className="navbar__item" to="/sprints">
              <Button type="button" color="inherit">
                Sprints
              </Button>
            </Link>
            <Link className="navbar__item" to="/kanban">
              <Button type="button" color="inherit">
                Kanban
              </Button>
            </Link>

            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={logOut}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
