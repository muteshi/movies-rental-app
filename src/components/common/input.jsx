import React from "react";

const Input = ({ name, handleChange, value, label, type }) => {
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
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
