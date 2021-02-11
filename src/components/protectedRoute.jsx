import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const currentUser = await auth.getCurrentUser();
    setUser(currentUser);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
