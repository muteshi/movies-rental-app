import React, { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/login";
  });

  return null;
};

export default Logout;
