import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";

import ConstantRoutes from "./routes_array";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/Error";
import { useAuth } from "../contexts/auth";

export default function Routes(): React.ReactElement {
  const {signed} = useAuth();
  function HandleRoutes(props: RouteProps): React.ReactElement {
    return <Route {...props} />;
  }

  return (
    <Switch>
      {ConstantRoutes.map((route) => (
        <HandleRoutes {...route} key={route.path} />
      ))}
      {signed ? <Route path="/admin" component={Admin}/>: null}
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
}
