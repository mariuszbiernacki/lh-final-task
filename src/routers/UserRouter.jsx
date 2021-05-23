import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Navbar from "../components/user/Navbar";
import TasksPage from "../pages/user/TasksPage";
import UsersPage from "../pages/user/UsersPage";

const UserRouter = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/tasks" />
        <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/users" component={UsersPage} />
        <Redirect from="*" to="/tasks" />
      </Switch>
    </>
  );
};

export default UserRouter;
