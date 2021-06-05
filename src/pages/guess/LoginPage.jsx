import React from "react";
import LoginForm from "../../components/guess/LoginForm";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <Link to="/register">
        <Button type="submit" variant="contained" color="secondary">
          Register
        </Button>
      </Link>
      <LoginForm />
    </>
  );
};

export default LoginPage;
