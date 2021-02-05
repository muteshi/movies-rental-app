import React, { useState } from "react";
import { useEffect } from "react";
import Input from "./common/input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, password);
  };

  return (
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <h4 className="text-center">Login Form</h4>
        <form className="auth" onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            handleChange={setUsername}
            value={username}
            label="Username"
          />
          <Input
            name="password"
            type="password"
            handleChange={setPassword}
            value={password}
            label="Password"
          />

          <button className="btn btn-primary btn-block mb-3">Login</button>
        </form>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
};

export default LoginForm;
