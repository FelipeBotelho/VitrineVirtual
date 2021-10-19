import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/auth";

function PrivateRoute({ component: Component, ...rest }: any) {
    const { signed, user } = useAuth();
  debugger;
  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <Component {...props} />
        ) : (
            <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;