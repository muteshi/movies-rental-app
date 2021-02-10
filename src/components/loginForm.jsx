import React from "react";
import Joi from "joi-browser";

import useForm from "../hooks/useForm";
import { loginUser } from "../services/authService";

const schema = {
  email: Joi.string().required().label("Email address"),
  password: Joi.string().required().label("Password"),
};

const LoginForm = (props) => {
  const { data, setErrors, handleSubmit, renderButton, renderInput } = useForm(
    schema
  );

  const doSubmit = async () => {
    try {
      const { data: jwt } = await loginUser(data);
      localStorage.setItem("token", jwt);
      props.history.replace("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data });
      }
    }
  };

  const formSubmitHandler = (e) => handleSubmit(e, doSubmit());

  return (
    <div className="row">
      <div className="col-sm-4" />
      <div className="col-sm-4">
        <h4 className="text-center">Login Form</h4>
        <form className="auth" onSubmit={formSubmitHandler}>
          {renderInput("email", "Email address")}
          {renderInput("password", "Password", "password")}
          {renderButton("Login")}
        </form>
      </div>
      <div className="col-sm-4" />
    </div>
  );
};

export default LoginForm;
