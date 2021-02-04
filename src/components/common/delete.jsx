import React from "react";
const Delete = ({ onDelete, movie }) => {
  return (
    <i
      className="fa fa-trash-o"
      aria-hidden="true"
      onClick={() => onDelete(movie._id)}
      style={{ color: "red", cursor: "pointer" }}
    />
  );
};

export default Delete;
