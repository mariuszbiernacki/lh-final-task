import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/guess/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <Link to="/login">Login</Link>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
