import React, { useEffect } from "react";

import { logout } from "../services/authService";

const Logout = (props) => {
  useEffect(() => {
    logout();
    window.location = "/";
  });

  return null;
};

export default Logout;
