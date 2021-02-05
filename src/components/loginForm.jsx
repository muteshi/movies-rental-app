import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

const LoginForm = () => {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(account, schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    setErrors(newErrors || {});
    if (errors) return;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const inputSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, inputSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMsg = validateProperty(input);
    const newErrors = { ...errors };
    if (errorMsg) newErrors[input.name] = errorMsg;
    else delete newErrors[input.name];
    setErrors(newErrors);
    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  return (
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <h4 className="text-center">Login Form</h4>
        <form className="auth" onSubmit={handleSubmit}>
          <Input
            error={errors.username}
            name="username"
            type="text"
            handleChange={handleChange}
            value={account.username}
            label="Username"
          />
          <Input
            error={errors.password}
            name="password"
            type="password"
            handleChange={handleChange}
            value={account.password}
            label="Password"
          />

          <button
            className="btn btn-primary btn-block mb-3"
            disabled={validate()}
          >
            Login
          </button>
        </form>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
};

export default LoginForm;
