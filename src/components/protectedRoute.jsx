import React from "react";
import { Redirect, Route } from "react-router-dom";
import useCurrentUser from "../hooks/getUser";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { user } = useCurrentUser();

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
