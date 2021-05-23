import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/guess/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Link to="/register">Register</Link>
      <LoginForm />
    </>
  );
};

export default LoginPage;
