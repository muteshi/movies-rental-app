import React from "react";
import Joi from "joi-browser";

import useForm from "../hooks/useForm";

const schema = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
};

const LoginForm = () => {
  const { data, handleSubmit, renderButton, renderInput } = useForm(schema);

  const doSubmit = () => {
    console.log("submitted");
    console.log(data);
  };

  const formSubmitHandler = (e) => handleSubmit(e, doSubmit());

  return (
    <div className="row">
      <div className="col-sm-4" />
      <div className="col-sm-4">
        <h4 className="text-center">Login Form</h4>
        <form className="auth" onSubmit={formSubmitHandler}>
          {renderInput("username", "Username")}
          {renderInput("password", "Password", "password")}
          {renderButton("Login")}
        </form>
      </div>
      <div className="col-sm-4" />
    </div>
  );
};

export default LoginForm;
