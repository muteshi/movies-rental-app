import React from "react";
import Joi from "joi-browser";

import useForm from "../hooks/useForm";
import { loginUser } from "../services/authService";
import useCurrentUser from "../hooks/getUser";
import { Redirect } from "react-router-dom";

const schema = {
  email: Joi.string().required().label("Email address"),
  password: Joi.string().required().label("Password"),
};

const LoginForm = (props) => {
  const { user } = useCurrentUser();
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
  const currentUser = user === null ? {} : user;

  const loginForm =
    Object.keys(currentUser).length === 0 || user === null ? (
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
