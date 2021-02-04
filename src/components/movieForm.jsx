import React from "react";

const MovieForm = (props) => {
  console.log(props);
  const handleClick = () => {
    props.history.replace("/");
  };

  return (
    <React.Fragment>
      <button type="button" className="btn btn-success" onClick={handleClick}>
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
