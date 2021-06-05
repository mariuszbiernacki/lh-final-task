import React from "react";
import RegisterForm from "../../components/guess/RegisterForm";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <Link to="/login">
        <Button type="submit" variant="contained" color="secondary">
          Log in
        </Button>
      </Link>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
