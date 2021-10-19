import React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";

import ConstantRoutes from "./routes_array";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/Error";
import PrivateRoute from "./private_route";

export default function Routes(): React.ReactElement {
  function HandleRoutes(props: RouteProps): React.ReactElement {
    return <Route {...props} />;
  }

  return (
    <Switch>
      {ConstantRoutes.map((route) => (
        <HandleRoutes {...route} key={route.path} />
      ))}
      <PrivateRoute path="/admin" component={Admin}/>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
}
