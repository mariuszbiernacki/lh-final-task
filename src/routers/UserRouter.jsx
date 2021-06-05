import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Navbar from "../components/user/Navbar";
import AddCommentPage from "../pages/user/AddCommentPage";
import AddSprintPage from "../pages/user/AddSprintPage";
import AddTaskPage from "../pages/user/AddTaskPage";
import EditTaskPage from "../pages/user/EditTaskPage";
import HomePage from "../pages/user/HomePage";
import KanbanPage from "../pages/user/KanbanPage";
import SprintDetailsPage from "../pages/user/SprintDetailsPage";
import SprintsPage from "../pages/user/SprintsPage";
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
        <Route
          exact
          path="/tasks/:id/comments/add"
          component={AddCommentPage}
        />
        <Route exact path="/tasks/:id/edit" component={EditTaskPage} />
        <Route exact path="/sprints" component={SprintsPage} />
        <Route exact path="/sprints/add" component={AddSprintPage} />
        <Route exact path="/sprints/:id" component={SprintDetailsPage} />
        <Route exact path="/kanban" component={KanbanPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default UserRouter;
