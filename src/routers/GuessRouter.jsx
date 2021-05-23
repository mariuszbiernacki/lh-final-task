import React from "react";
import { Redirect, Route, Switch } from "react-router";
import LoginPage from "../pages/guess/LoginPage";
import RegisterPage from "../pages/guess/RegisterPage";

const GuessRouter = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default GuessRouter;
