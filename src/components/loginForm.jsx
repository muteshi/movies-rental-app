import React from "react";
import Joi from "joi-browser";

import useForm from "../hooks/useForm";
import auth, { loginUser } from "../services/authService";
import { Redirect } from "react-router-dom";

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
      await loginUser(data);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data });
      }
    }
  };

  const formSubmitHandler = (e) => handleSubmit(e, doSubmit());

  //if user object is null set to an empty object
  // const user = user === null ? {} : user;
  const user = auth.getCurrentUser();

  const loginForm = !user ? (
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
  ) : (
    <Redirect to="/" />
  );

  return loginForm;
};

export default LoginForm;
