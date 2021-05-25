import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Navbar from "../components/user/Navbar";
import HomePage from "../pages/user/HomePage";
import TasksPage from "../pages/user/TasksPage";
import UsersPage from "../pages/user/UsersPage";

const UserRouter = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/users" component={UsersPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default UserRouter;
