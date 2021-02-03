import React from "react";

const Like = (props) => {
  const classes = props.like ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.onLike}
      style={{ color: "red", cursor: "pointer" }}
    ></i>
  );
};

export default Like;
