import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem("access-token");
    window.location.href = "/";
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={logOut}
        >
          log out
        </Button>
      </li>
    </ul>
  );
};

export default Navbar;
