import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Navbar from "../components/user/Navbar";
import AddTaskPage from "../pages/user/AddTaskPage";
import HomePage from "../pages/user/HomePage";
import TaskDetailsPage from "../pages/user/TaskDetailsPage";
import TasksPage from "../pages/user/TasksPage";
import UsersPage from "../pages/user/UsersPage";

const UserRouter = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tasks/add" component={AddTaskPage} />
        <Route exact path="/tasks/:id" component={TaskDetailsPage} />
        <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/users" component={UsersPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default UserRouter;
