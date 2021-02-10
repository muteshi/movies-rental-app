import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import { saveUser } from "../services/userService";
import { toast } from "react-toastify";

const schema = {
  email: Joi.string().email().required().label("Email address"),
  name: Joi.string().min(3).required().label("Full name"),
  password: Joi.string().min(5).required().label("Password"),
};

const RegistrationForm = (props) => {
  const { data, setErrors, handleSubmit, renderButton, renderInput } = useForm(
    schema
  );

  const doSubmit = async () => {
    try {
      const { status, headers } = await saveUser(data);
      console.log(headers);
      if (status === 200) {
        toast.success("You have successfully created account");
        localStorage.setItem("token", headers["x-auth-token"]);
        window.location = "/";
      }
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
