import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";

const schema = {
  email: Joi.string().email().required().label("Email address"),
  name: Joi.string().min(3).required().label("Full name"),
  password: Joi.string().min(5).required().label("Password"),
};

const RegistrationForm = () => {
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
        <h4 className="text-center">Registration Form</h4>
        <form className="auth" onSubmit={formSubmitHandler}>
          {renderInput("email", "Email address", "email")}
          {renderInput("password", "Password", "password")}
          {renderInput("name", "Full name")}
          {renderButton("Register")}
        </form>
      </div>
      <div className="col-sm-4" />
    </div>
  );
};

export default RegistrationForm;
