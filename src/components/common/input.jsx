import React from "react";

const Input = ({ error, name, handleChange, value, label, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} />
      <input
        autoFocus
        id={name}
        name={name}
        type={type}
        className="form-control"
        placeholder={label}
        value={value}
        onChange={handleChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
